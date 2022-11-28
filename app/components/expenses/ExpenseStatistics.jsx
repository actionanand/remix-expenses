import { useMemo } from 'react';
import { formatMyCurrency } from '~/components/util/currency-format';

function calculateSummaryStatistics(expenses) {
  const amounts = expenses.map((expense) => +expense.amount);
  const maxAmount = Math.max(...amounts);
  const minAmount = Math.min(...amounts);
  const sum = expenses.reduce((prevVal, curVal) => curVal.amount + prevVal, 0);
  const mean = sum / expenses.length;

  return { minAmount, maxAmount, sum, mean };
}

function ExpenseStatistics({ expenses }) {
  const { minAmount, maxAmount, sum, mean } = useMemo(
    () => calculateSummaryStatistics(expenses),
    [expenses]
  );

  return (
    <section>
      <h2>Summary Statistics</h2>
      <dl id="expense-statistics">
        <div>
          <dt>Total</dt>
          {/* <dd>&#8377; {sum.toFixed(2)}</dd> */}
          <dd>{formatMyCurrency(sum)}</dd>
        </div>
        <div>
          <dt>Average</dt>
          <dd>{formatMyCurrency(mean)}</dd>
        </div>
        <div>
          <dt> Min. Amount</dt>
          <dd>{formatMyCurrency(minAmount)}</dd>
        </div>
        <div>
          <dt>Max. Amount</dt>
          <dd>{formatMyCurrency(maxAmount)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default ExpenseStatistics;
