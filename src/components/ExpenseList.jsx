import React from "react";
import ExpenseItem from "./ExpenseItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; 

const ExpenseList = ({ expenses, deleteExpense, editExpense, clearExpenses }) => {
  return (
    <div className="expense-list-container">
      <ul className="expense-list-section">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            deleteExpense={deleteExpense}
            editExpense={editExpense}
          />
        ))}
      </ul>
      {expenses.length > 0 && (
        <div className="clear-btn-wrapper">
          <button className="clear-btn" onClick={clearExpenses}>
            목록 지우기
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;