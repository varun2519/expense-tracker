import React from 'react';

export default function ExpenseList({ expenses, onEdit, onDelete, page, onPageChange }) {
  return (
    <div className="panel">
      <h2>Expenses</h2>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.content && expenses.content.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.date}</td>
              <td>{exp.description}</td>
              <td>{exp.categoryName}</td>
              <td>Rs. {Number(exp.amount).toFixed(2)}</td>
              <td>
                <button className="link-btn" onClick={() => onEdit(exp)}>Edit</button>
                <button className="link-btn" onClick={() => onDelete(exp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={page === 0} onClick={() => onPageChange(page - 1)}>Prev</button>
        <span>Page {page + 1} of {expenses.totalPages || 1}</span>
        <button disabled={expenses.last} onClick={() => onPageChange(page + 1)}>Next</button>
      </div>
    </div>
  );
}
