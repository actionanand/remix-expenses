import { useNavigate } from '@remix-run/react';
import { redirect } from '@remix-run/node';

import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { updateExpense, deleteExpense } from '~/db/expenses.server';
import { validateExpenseInput } from '~/db/validation.server';
// import { getExpense } from '~/db/expenses.server';

export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  const handleModalClose = () => {
    navigate('..');
  }

  return <Modal onClose={handleModalClose}>
    <ExpenseForm />
  </Modal>;
}

export async function action({params, request}) {
  const expenseId = params.id;
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  if(request.method === 'PATCH') {
    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }
  
    await updateExpense(expenseId, expenseData);
    return redirect('/expenses');
    
  } else if(request.method === 'DELETE') {
    await deleteExpense(expenseId);
    return {id: expenseId}
  }

}

// export async function loader({params}) {
//   const expenseId = params.id;

//   try {
//     const expense = await getExpense(expenseId);
//     return expense;
//   } catch (error) {
//     console.log(error);
//     throw error; 
//   }
// }