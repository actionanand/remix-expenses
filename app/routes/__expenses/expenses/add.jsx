import { useNavigate } from '@remix-run/react';
import { redirect } from '@remix-run/node';

import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { addExpense } from '~/db/expenses.server';
import { validateExpenseInput } from '~/db/validation.server';
import { getUserFromSession } from '~/db/auth.server';

export default function AddExpensesPage() {
  const navigate = useNavigate();

  const handleModalClose = () => {
    navigate('..')
  }

  return <Modal onClose={handleModalClose}>
    <ExpenseForm />
  </Modal>;
}

// end point is component's url(post req) : /expenses/add
export async function action({request, params}) {
  const userId = await getUserFromSession(request);

  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData, userId);
  return redirect('/expenses');
}

export function meta() {
  return {
    title: 'Remix-Expenses Add',
    description: 'Add a new expense with ease.'
  };
}