import { useNavigate } from '@remix-run/react';
import { redirect } from '@remix-run/node';

import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { addExpense } from '~/db/expenses.server';

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
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  await addExpense(expenseData);
  return redirect('/expenses');
}