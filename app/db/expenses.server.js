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
    throw new Error('Unable to add the expense, Please try again after sometime!'); 
  }
}

export async function getExpenses() {
  try {
    const expenses = await prisma.expense.findMany({orderBy: {date: 'desc'}});
    return expenses;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to load all of your expenses, Please try again after sometime!'); 
  }
}

export async function getExpense(id) {
  try {
    const expense = await prisma.expense.findFirst({where: {id}});
    return expense;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to load the expense, Please try again after sometime!'); 
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
    throw new Error('Unable to update the expense, Please try again after sometime!'); 
  }
}

export async function deleteExpense(id) {
  try {
    await prisma.expense.delete({where: {id}});
  } catch (error) {
    console.log(error);
    throw new Error('Unable to delete the expense, Please try again after sometime!'); 
  }
}