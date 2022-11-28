// resources route

import { getExpenses } from '~/db/expenses.server';

export async function loader() {
  try {
    const expenses = await getExpenses();
    return expenses;
  } catch (error) {
    console.log(erroe);
    throw new Error('Failed to load Raw data, please try again after sometime!');
  }
}