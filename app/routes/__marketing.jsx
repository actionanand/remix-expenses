// pathless layout route

import { Outlet } from '@remix-run/react';

import expensesStyle from '~/styles/marketing.css';
import MainHeader from '~/components/navigation/MainHeader';

export default function MarketingPathlessLayout() {
  return <>
    <MainHeader />
    <Outlet />
  </>;
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyle }];
}

