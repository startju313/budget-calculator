import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import AlertMessage from "./components/AlertMessage";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [alert, setAlert] = useState({ show: false, type: "", text: "" });
  const [editingItem, setEditingItem] = useState(null);
  const [totalExpense, setTotalExpense] = useState(0);

  // ✅ 총 지출 계산
  useEffect(() => {
    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalExpense(total);
  }, [expenses]);

  // ✅ localStorage에 저장
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // 항목 추가 or 수정
  const addExpense = (expense) => {
    const { id, charge, amount } = expense;

    if (editingItem) {
      setExpenses(
        expenses.map((item) =>
          item.id === id ? { ...item, charge, amount } : item
        )
      );
      setEditingItem(null);
      showAlert("success", "아이템이 수정되었습니다.");
    } else {
      setExpenses([...expenses, { id: crypto.randomUUID(), charge, amount }]);
      showAlert("success", "아이템이 생성되었습니다.");
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
    showAlert("danger", "아이템이 삭제되었습니다.");
  };

  const handleEditClick = (id) => {
    const itemToEdit = expenses.find((item) => item.id === id);
    setEditingItem(itemToEdit);
  };

  const clearExpenses = () => {
    setExpenses([]);
    showAlert("danger", "목록이 모두 삭제되었습니다.");
  };

  const showAlert = (type, text) => {
    setAlert({ show: true, type, text });
    setTimeout(() => setAlert({ show: false, type: "", text: "" }), 3000);
  };

  return (
  <div className="main-wrapper">
    <div className="container">
      {/* ✅ 알림을 container 안쪽으로 옮김 */}
      {alert.show && <AlertMessage type={alert.type} text={alert.text} />}

      <h2>예산 계산기</h2>
      <div className="content-box">
        <ExpenseForm addExpense={addExpense} editingItem={editingItem} />
        <ExpenseList
          expenses={expenses}
          deleteExpense={deleteExpense}
          editExpense={handleEditClick}
          clearExpenses={clearExpenses}
        />
      </div>
      <div className="total-section">
        총 지출:{" "}
        <span className="total-cost">{totalExpense.toLocaleString()}원</span>
      </div>
    </div>
  </div>
  );
}

export default App;

