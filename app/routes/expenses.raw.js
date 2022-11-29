// resources route

import { getExpenses } from '~/db/expenses.server';
import { requireUserSession } from '~/db/auth.server';

export async function loader({request}) {
  const userId = await requireUserSession(request);

  try {
    const expenses = await getExpenses(userId);
    return expenses;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to load Raw data, please try again after sometime!');
  }
}