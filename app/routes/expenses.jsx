import { Outlet } from '@remix-run/react';

import expensesStyle from '~/styles/expenses.css';
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
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </main>
  </>;

}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyle }];
}