import React from 'react';

export default function MonthlySummary({ summary }) {
  if (!summary) return null;
  return (
    <div className="panel">
      <h2>Monthly Summary — {summary.month}/{summary.year}</h2>
      <p className="total">Total: Rs. {Number(summary.total || 0).toFixed(2)}</p>
      <ul className="summary-list">
        {(summary.byCategory || []).map((row) => (
          <li key={row.categoryName}>
            <span>{row.categoryName}</span>
            <span>Rs. {Number(row.totalAmount).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
