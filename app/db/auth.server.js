import { hash, compare } from 'bcryptjs';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

import { prisma } from './database.server';


const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days in ms
    httpOnly: true
  }
});


export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  const userId = session.get('userId');

  if(!userId) {
    return null;
  }

  return userId;
}

export async function requireUserSession(request) {
  const userId = await getUserFromSession(request);

  if(!userId) {
    throw redirect('/auth?mode=login');
  }

  return userId;
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session)
    }
  });
}

async function craeteUserSession(userId, redirectPath='/') {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);

  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session)
    }
  });
}

export async function signup({email, password: rawPass}) {
  const existingUser = await prisma.user.findFirst({where: { email }});

  if(existingUser) {
    const error = new Error('User exists with same email ID');
    error.status = 422;
    throw error;
  }

  const password = await hash(rawPass, 12);

  const user = await prisma.user.create({data: { email, password }});
  return craeteUserSession(user.id, '/expenses');
}

export async function login({ email, password: rawPass }) {
  const existingUser = await prisma.user.findFirst({where: { email }});

  if(!existingUser) {
    const error = new Error('User not found, please check your email ID');
    error.status = 401;
    throw error;
  }

  const isPassCorrect = await compare(rawPass, existingUser.password);

  if(!isPassCorrect) {
    const error = new Error('Please check your password.');
    error.status = 401;
    throw error;
  }

  return craeteUserSession(existingUser.id, '/expenses');
}