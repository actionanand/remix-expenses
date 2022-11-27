import { useNavigate } from '@remix-run/react';

import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
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