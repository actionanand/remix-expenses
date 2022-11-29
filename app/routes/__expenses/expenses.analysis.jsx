import { json } from '@remix-run/node';
import { useLoaderData, useCatch } from '@remix-run/react';

import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '~/components/expenses/Chart';
import { getExpenses } from '~/db/expenses.server';
import Error from '~/components/util/Error';
import { requireUserSession } from '~/db/auth.server';


export default function AnalysisPage() {
  const expenses = useLoaderData();
  
  return <main>
    <Chart expenses={expenses} />
    <ExpenseStatistics expenses={expenses} />
  </main>;
}

export async function loader({request}) {
  await requireUserSession(request);
  try {
    const expenses = await getExpenses();

    if(!expenses || expenses.length <= 0) {
      throw json({message: 'Could not load the expenses!'}, {
        status: 404,
        statusText: 'Expenses Not Found!'
      });
    }
    return expenses;

  } catch (error) {
    console.log(error);
    throw json({message: 'Failed loading the expenses!'}, {
      status: 404,
      statusText: 'Expenses Not Found!'
    });
  }
}

export function CatchBoundary() {
  const caughtResp = useCatch();
  return <main title={caughtResp.statusText}>
    <Error>
      {caughtResp.data?.message || 'Oops!, Unable to load expenses, Please try again after sometime.'}
    </Error>
  </main>;
}