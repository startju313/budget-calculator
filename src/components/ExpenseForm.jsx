import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function ExpenseForm({ addExpense, editingItem }) {
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (editingItem) {
      setCharge(editingItem.charge);
      setAmount(editingItem.amount);
    } else {
      setCharge("");
      setAmount("");
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge.trim() !== "" && amount > 0) {
      const newExpense = {
        id: editingItem ? editingItem.id : crypto.randomUUID(),
        charge: charge.trim(),
        amount: parseInt(amount),
      };
      addExpense(newExpense);
      setCharge("");
      setAmount("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-section">
        <div className="input-group">
          <label htmlFor="expense-name">지출 항목</label>
          <input
            type="text"
            id="expense-name"
            placeholder="예) 렌트비"
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="expense-cost">비용</label>
          <input
            type="number"
            id="expense-cost"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="submit-btn">
        {editingItem ? "수정" : "제출"}
        {/* ✨ 제출 버튼 옆에 아이콘 추가 */}
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
}

export default ExpenseForm;