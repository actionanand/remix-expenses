// pathless layout route

import { Outlet } from '@remix-run/react';

import expensesStyle from '~/styles/marketing.css';

export default function MarketingPathlessLayout() {
  return <Outlet />;
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyle }];
}

