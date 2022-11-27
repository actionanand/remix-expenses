import { Link, useActionData, Form, useSubmit, useTransition as useNavigation } from '@remix-run/react';

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const validationError = useActionData();
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';

  const submitHandler = e => {
    e.preventDefault();
    // perform client side validations
    submit(e.target, {
      // action: 'expenses/add',
      method: 'post'
    });
  }

  return (
    <Form method="post" className="form" id="expense-form" onSubmit={submitHandler}>
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30} />
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
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required />
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
