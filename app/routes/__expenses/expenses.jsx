import { Outlet, Link, useLoaderData } from '@remix-run/react';
import { FaPlus, FaDownload } from 'react-icons/fa';
import { json } from '@remix-run/node';

import ExpensesList from '~/components/expenses/ExpensesList';
import { getExpenses } from '~/db/expenses.server';
import { requireUserSession } from '~/db/auth.server';


// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     title: 'My First Expenses',
//     amount: 13.67,
//     date: new Date().toISOString()
//   },
//   {
//     id: 'e3',
//     title: 'My Seond Expenses',
//     amount: 19.85,
//     date: new Date().toISOString()
//   }
// ];

export default function ExpensesLayout() {
  const expenses = useLoaderData();
  const hasExpenses = expenses && expenses.length > 0;

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
      {hasExpenses && <ExpensesList expenses={expenses} />}
      {!hasExpenses && <section id='no-expenses'>
        <h1>No Expenses Found!</h1>
        <p>Start <Link to='add'> Adding Some ...</Link></p>
        </section>}
    </main>
  </>;
}

export async function loader({request, params}) {
  const userId = await requireUserSession(request);

  try {
    const expenses = await getExpenses(userId);

    // if (!expenses || expenses.length === 0) {
    //   return json({message: 'Coud not find any expenses!'}, {
    //     status: 404,
    //     statusText: 'No expenses Found!'
    //   });
    // }

    return expenses;
    // return json(expenses);
  } catch (error) {
    console.log(error);
    throw new Error('Oops!, Failed loading your expenses!');
  }
}


export function CatchBoundary() {

}

