// pathless layout route

import { Outlet } from '@remix-run/react';

import expensesStyle from '~/styles/expenses.css';
import ExpensesHeader from '~/components/navigation/ExpensesHeader';

export default function ExpensesPathlessLayout() {
  return <>
    <ExpensesHeader />
    <Outlet />
  </>;
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyle }];
}

