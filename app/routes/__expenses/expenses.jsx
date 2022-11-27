import { Outlet, Link, useLoaderData } from '@remix-run/react';
import { FaPlus, FaDownload } from 'react-icons/fa';
import { json } from '@remix-run/node';

import ExpensesList from '~/components/expenses/ExpensesList';
import { getExpenses } from '~/db/expenses.server';


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
      <ExpensesList expenses={expenses} />
    </main>
  </>;
}

export async function loader({request, params}) {
  try {
    const expenses = await getExpenses();

    if (!expenses || expenses.length === 0) {
      return json({message: 'Coud not find any expenses!'}, {
        status: 404,
        statusText: 'No expenses Found!'
      });
    }

    return expenses;
    // return json(expenses);
  } catch (error) {
    console.log(error);
    throw new Error('Oops!, Failed loading your expenses!');
  }
}

