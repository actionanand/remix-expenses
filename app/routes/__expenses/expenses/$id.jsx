import { useNavigate } from '@remix-run/react';

import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';

export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  const handleModalClose = () => {
    navigate('..')
  }
  return <Modal onClose={handleModalClose}>
    <ExpenseForm />
  </Modal>;
}