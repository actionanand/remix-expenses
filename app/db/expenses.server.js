import { prisma } from './database.server';

export async function addExpense({title, date, amount}) {
  try {
    return await prisma.expense.create({data: {
      title,
      amount: +amount,
      date: new Date(date)
    }});
  } catch (error) {
    console.log(error);
    throw error;
  }
}