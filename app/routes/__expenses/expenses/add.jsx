import { useNavigate } from '@remix-run/react';

import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';

export default function AddExpensesPage() {
  const navigate = useNavigate();

  const handleModalClose = () => {
    navigate('..')
  }

  return <Modal onClose={handleModalClose}>
    <ExpenseForm />
  </Modal>;
}