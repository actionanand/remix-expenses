import { Outlet, Link } from '@remix-run/react';
import { FaPlus, FaDownload } from 'react-icons/fa';

import ExpensesList from '~/components/expenses/ExpensesList';


const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'My First Expenses',
    amount: 13.67,
    date: new Date().toISOString()
  },
  {
    id: 'e3',
    title: 'My Seond Expenses',
    amount: 19.85,
    date: new Date().toISOString()
  }
];

export default function ExpensesLayout() {
  return <>
    <Outlet />
    <main>
      <section id='expenses-actions'>
        <Link to="add">
          <FaPlus />
          <span> Add Expense </span>
        </Link>
        <a href="/expenses/raw">
          <FaDownload />
          Load Raw Data
        </a>
      </section>
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </main>
  </>;

}

