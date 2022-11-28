import { hash, compare } from 'bcryptjs';

import { prisma } from './database.server';

export async function signup({email, password: rawPass}) {
  const existingUser = await prisma.user.findFirst({where: { email }});

  if(existingUser) {
    const error = new Error('User exists with same email ID');
    error.status = 422;
    throw error;
  }

  const password = await hash(rawPass, 12);

  await prisma.user.create({data: { email, password }});
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
}