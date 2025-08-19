import React from "react";

function ExpenseItem({ expense, deleteExpense, editExpense }) {
  return (
    <li className="expense-item">
      <span className="expense-name">{expense.charge}</span>
      <span className="expense-cost">{expense.amount.toLocaleString()}원</span>
      <div className="item-actions">
        <button onClick={() => editExpense(expense.id)} className="edit-btn" aria-label="수정">
          <i className="fas fa-pen"></i>
        </button>
        <button onClick={() => deleteExpense(expense.id)} className="delete-btn" aria-label="삭제">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </li>
  );
}


export default ExpenseItem;