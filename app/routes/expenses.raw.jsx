// resources route

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

export function loader() {
  return DUMMY_EXPENSES;
}