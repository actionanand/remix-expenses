import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '~/components/expenses/Chart';

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

export default function AnalysisPage() {
  return <main>
    <Chart expenses={DUMMY_EXPENSES} />
    <ExpenseStatistics expenses={DUMMY_EXPENSES} />
  </main>;
}