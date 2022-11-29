import { useNavigate } from '@remix-run/react';
import { redirect } from '@remix-run/node';

import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { updateExpense, deleteExpense } from '~/db/expenses.server';
import { validateExpenseInput } from '~/db/validation.server';
import { getUserFromSession } from '~/db/auth.server';
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
  await getUserFromSession(request);
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
    return {expenseId, content: 'deleted successfully'}
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

export function meta({params, location, data, parentsData}) {
  const expense = parentsData['routes/__expenses/expenses']
    .find(exp => exp.id === params.id);

  return {
    title: 'Remix-Expenses - ' + expense.title,
    description: 'Edit an existing expense with ease.'
  };
}