import { hash } from 'bcryptjs';

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