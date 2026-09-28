import React, { useState, useEffect } from 'react';

export default function ExpenseForm({ categories, onSubmit, editingExpense, onCancelEdit }) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    categoryId: '',
  });

  useEffect(() => {
    if (editingExpense) {
      setForm({
        description: editingExpense.description,
        amount: editingExpense.amount,
        date: editingExpense.date,
        categoryId: editingExpense.categoryId,
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.categoryId) return;
    onSubmit({ ...form, amount: parseFloat(form.amount), categoryId: parseInt(form.categoryId, 10) });
    setForm({ description: '', amount: '', date: new Date().toISOString().slice(0, 10), categoryId: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="panel expense-form">
      <h2>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="amount"
        type="number"
        step="0.01"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />
      <select name="categoryId" value={form.categoryId} onChange={handleChange}>
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <div className="form-actions">
        <button type="submit">{editingExpense ? 'Update' : 'Add'}</button>
        {editingExpense && <button type="button" onClick={onCancelEdit}>Cancel</button>}
      </div>
    </form>
  );
}
