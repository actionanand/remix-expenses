// pathless layout route

import { Outlet } from '@remix-run/react';

import expensesStyle from '~/styles/expenses.css';

export default function ExpensesPathlessLayout() {
  return <Outlet />;
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyle }];
}

