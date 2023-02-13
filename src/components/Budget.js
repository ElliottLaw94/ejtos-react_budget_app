import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const BUDGET_MAX_VALUE = 20000;

const Budget = () => {
  const { budget, expenses, currency, dispatch } = useContext(AppContext);

  const onChangeBudgetHandler = (event) => {

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    console.log(totalExpenses);

    const value = Number(event.target.value);

    if (value < totalExpenses) {
      alert("You cannot reduce the budget value lower than the spending " + currency + totalExpenses);
    } else {
      if (value > BUDGET_MAX_VALUE) {
        alert('The budget value cannot exceed ' + currency + BUDGET_MAX_VALUE);
        return;
      }

      dispatch({
        type: 'SET_BUDGET',
        payload: value,
      });
    }
  };

  return (
    <div className="alert alert-secondary"
         style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div><label htmlFor="budget"> Budget:</label></div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{currency}</span>
        <input
          required="required"
          type="number"
          id="budget"
          value={budget}
          step="10"
          onChange={onChangeBudgetHandler}
        ></input>
      </div>
    </div>
  );
};

export default Budget;
