import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const client = axios.create({ baseURL: API_BASE });

export const getExpenses = (params) => client.get('/expenses', { params });
export const getExpense = (id) => client.get(`/expenses/${id}`);
export const createExpense = (data) => client.post('/expenses', data);
export const updateExpense = (id, data) => client.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => client.delete(`/expenses/${id}`);

export const getCategories = () => client.get('/categories');
export const createCategory = (data) => client.post('/categories', data);
export const updateCategory = (id, data) => client.put(`/categories/${id}`, data);
export const deleteCategory = (id) => client.delete(`/categories/${id}`);

export const getMonthlySummary = (year, month) =>
  client.get('/reports/monthly', { params: { year, month } });

export default client;
