import { prisma } from './database.server';

export async function addExpense({title, date, amount}, userId) {
  try {
    return await prisma.expense.create({data: {
      title,
      amount: +amount,
      date: new Date(date),
      User: { connect: {id: userId} }
    }});
  } catch (error) {
    console.log(error);
    throw new Error('Unable to add the expense, Please try again after sometime!'); 
  }
}

export async function getExpenses(userId) {
  try {
    const expenses = await prisma.expense.findMany({
      where: {userId},
      orderBy: {date: 'desc'}
    });
    return expenses;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to load all of your expenses, Please try again after sometime!'); 
  }
}

export async function getExpense(id) {
  try {
    const expense = await prisma.expense.findFirst({
      where: {id}
    });
    return expense;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to load the expense, Please try again after sometime!'); 
  }
}

export async function updateExpense(id, {title, amount, date}, userId) {
  try {
    await prisma.expense.update({
      select: { userId },
      where: { id },
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

export async function deleteExpense(id, userId) {
  try {
    await prisma.expense.delete({
      where: {id},
      where: {userId}
    });
  } catch (error) {
    console.log(error);
    throw new Error('Unable to delete the expense, Please try again after sometime!'); 
  }
}