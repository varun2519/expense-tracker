import React, { useState } from 'react';

export default function CategoryManager({ categories, onAdd, onDelete }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <div className="panel">
      <h2>Categories</h2>
      <form onSubmit={handleSubmit} className="inline-form">
        <input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul className="category-list">
        {categories.map((c) => (
          <li key={c.id}>
            <span>{c.name}</span>
            <button className="link-btn" onClick={() => onDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
