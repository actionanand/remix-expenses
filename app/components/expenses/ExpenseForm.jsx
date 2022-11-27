import { Link, useActionData, Form, useSubmit, useTransition as useNavigation, 
  useLoaderData, useMatches, useParams } from '@remix-run/react';

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const validationError = useActionData();
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';
  // const expenseData = useLoaderData();
  const params = useParams();
  const matches = useMatches();
  // useMatches is to get the data from parant loader (not to send second get req. to db)
  // console.log(matches); // each active routes with id and data will be displayed (id will be in routes folder structure)
  const expensesDate = matches.find(match => match.id === 'routes/__expenses/expenses').data;
  const expenseData = expensesDate.find(expense => expense.id === params.id);

  const submitHandler = e => {
    const htmlMethod = expenseData ? 'patch' : 'post';
    e.preventDefault();
    // perform client side validations
    submit(e.target, {
      // action: 'expenses/add',
      method: htmlMethod
    });
  }

  const defaultValue = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date
      }
    : {
        title: '',
        amount: '',
        date: ''
      };

  return (
    <Form method={expenseData ? 'patch' : 'post'} className="form" id="expense-form" onSubmit={submitHandler}>
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30} defaultValue={defaultValue.title} />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValue.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required 
            defaultValue={defaultValue.date ? defaultValue.date.slice(0, 10) : ''} />
        </p>
      </div>

      {validationError && 
        <ul>
          {Object.values(validationError).map(error => <li key={error}> {error} </li>)}
        </ul>
      }

      <div className="form-actions">
        <button disabled={isSubmitting}> { isSubmitting ?  'Saving...' : 'Save Expense' } </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
