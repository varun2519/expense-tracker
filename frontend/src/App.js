import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Filters from './components/Filters';
import MonthlySummary from './components/MonthlySummary';
import CategoryManager from './components/CategoryManager';
import * as api from './api/expenseApi';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState({ content: [], totalPages: 0, last: true });
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({});
  const [editingExpense, setEditingExpense] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  const loadCategories = useCallback(async () => {
    const res = await api.getCategories();
    setCategories(res.data);
  }, []);

  const loadExpenses = useCallback(async () => {
    try {
      const res = await api.getExpenses({ ...filters, page, size: 10 });
      setExpenses(res.data);
    } catch (e) {
      setError('Failed to load expenses');
    }
  }, [filters, page]);

  const loadSummary = useCallback(async () => {
    const now = new Date();
    const res = await api.getMonthlySummary(now.getFullYear(), now.getMonth() + 1);
    setSummary(res.data);
  }, []);

  useEffect(() => { loadCategories(); }, [loadCategories]);
  useEffect(() => { loadExpenses(); }, [loadExpenses]);
  useEffect(() => { loadSummary(); }, [loadSummary]);

  const handleAddCategory = async (data) => {
    await api.createCategory(data);
    loadCategories();
  };

  const handleDeleteCategory = async (id) => {
    await api.deleteCategory(id);
    loadCategories();
  };

  const handleSubmitExpense = async (data) => {
    try {
      if (editingExpense) {
        await api.updateExpense(editingExpense.id, data);
        setEditingExpense(null);
      } else {
        await api.createExpense(data);
      }
      loadExpenses();
      loadSummary();
    } catch (e) {
      setError('Failed to save expense');
    }
  };

  const handleDeleteExpense = async (id) => {
    await api.deleteExpense(id);
    loadExpenses();
    loadSummary();
  };

  const handleApplyFilters = (f) => {
    setPage(0);
    setFilters(f);
  };

  return (
    <div className="app">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      {error && <div className="error-banner">{error}</div>}
      <div className="layout">
        <div className="sidebar">
          <ExpenseForm
            categories={categories}
            onSubmit={handleSubmitExpense}
            editingExpense={editingExpense}
            onCancelEdit={() => setEditingExpense(null)}
          />
          <CategoryManager
            categories={categories}
            onAdd={handleAddCategory}
            onDelete={handleDeleteCategory}
          />
          <MonthlySummary summary={summary} />
        </div>
        <div className="main">
          <Filters categories={categories} onApply={handleApplyFilters} />
          <ExpenseList
            expenses={expenses}
            page={page}
            onPageChange={setPage}
            onEdit={setEditingExpense}
            onDelete={handleDeleteExpense}
          />
        </div>
      </div>
    </div>
  );
}
