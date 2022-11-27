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

export async function getExpenses() {
  try {
    const expenses = await prisma.expense.findMany({orderBy: {date: 'desc'}});
    return expenses;
  } catch (error) {
    console.log(error);
    throw error; 
  }
}

export async function getExpense(id) {
  try {
    const expense = await prisma.expense.findFirst({where: {id}});
    return expense;
  } catch (error) {
    console.log(error);
    throw error; 
  }
}

export async function updateExpense(id, {title, amount, date}) {
  try {
    await prisma.expense.update({
      where: {id},
      data: {
        title,
        amount: +amount,
        date: new Date(date)
      }
    });
  } catch (error) {
    console.log(error);
    throw error; 
  }
}

export async function deleteExpense(id) {
  try {
    await prisma.expense.delete({where: {id}});
  } catch (error) {
    console.log(error);
    throw error; 
  }
}