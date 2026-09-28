import React, { useState } from 'react';

export default function Filters({ categories, onApply }) {
  const [filters, setFilters] = useState({ categoryId: '', from: '', to: '', keyword: '' });

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleApply = () => onApply(filters);

  const handleReset = () => {
    const cleared = { categoryId: '', from: '', to: '', keyword: '' };
    setFilters(cleared);
    onApply(cleared);
  };

  return (
    <div className="panel filters">
      <select name="categoryId" value={filters.categoryId} onChange={handleChange}>
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <input type="date" name="from" value={filters.from} onChange={handleChange} />
      <input type="date" name="to" value={filters.to} onChange={handleChange} />
      <input
        type="text"
        name="keyword"
        placeholder="Search description"
        value={filters.keyword}
        onChange={handleChange}
      />
      <button onClick={handleApply}>Apply</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
