import { Link, useFetcher, Form, useSubmit } from '@remix-run/react';

import { formatMyCurrency } from '~/components/util/currency-format';

function ExpenseListItem({ id, title, amount }) {
  // const submit = useSubmit();
  const fetcher = useFetcher(); // if u wanna perform action & don't want to navigate, use 'fetcher' instead 'submit'

  const deleteExpenseItemHandler = () => {
    const isDeletable = confirm('Are you sure? You wanna delete?');
    // submit(null, {
    //   method: 'delete',
    //   action: `/expenses/${id}`
    // });

    if(!isDeletable) {
      return;
    }

    fetcher.submit(null, {
      method: 'delete',
      action: `/expenses/${id}`
    });
  }

  if(fetcher.state !== 'idle') {
    return <article className='expense-item locked'>
      <p> Deleting... </p>
    </article>;
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        {/* <p className="expense-amount">&#8377; {amount.toFixed(2)}</p> */}
        <p className="expense-amount"> {formatMyCurrency(amount)} </p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/* <Form method='delete' action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form> */}
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
