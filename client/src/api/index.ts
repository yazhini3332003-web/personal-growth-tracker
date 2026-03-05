import axios from "axios";
import type {
  Goal,
  GoalFormData,
  Category,
  CategoryFormData,
  Task,
  TaskFormData,
  DailyLog,
  DailyLogFormData,
  DashboardData,
} from "../types";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
});

// Goals
export const fetchGoals = () => API.get<Goal[]>("/goals");
export const fetchGoal = (id: string) => API.get<Goal>(`/goals/${id}`);
export const createGoal = (data: GoalFormData) =>
  API.post<Goal>("/goals", data);
export const updateGoal = (id: string, data: Partial<GoalFormData>) =>
  API.put<Goal>(`/goals/${id}`, data);
export const deleteGoal = (id: string) => API.delete(`/goals/${id}`);
export const resetGoal = (id: string) => API.post<Goal>(`/goals/${id}/reset`);
export const fetchDashboard = (id: string) =>
  API.get<DashboardData>(`/goals/${id}/dashboard`);

// Categories
export const fetchCategories = (goalId: string) =>
  API.get<Category[]>(`/categories?goal=${goalId}`);
export const createCategory = (data: CategoryFormData) =>
  API.post<Category>("/categories", data);
export const updateCategory = (id: string, data: Partial<CategoryFormData>) =>
  API.put<Category>(`/categories/${id}`, data);
export const deleteCategory = (id: string) => API.delete(`/categories/${id}`);

// Tasks
export const fetchTasks = (goalId: string) =>
  API.get<Task[]>(`/tasks?goal=${goalId}`);
export const fetchTasksByCategory = (categoryId: string) =>
  API.get<Task[]>(`/tasks?category=${categoryId}`);
export const createTask = (data: TaskFormData) =>
  API.post<Task>("/tasks", data);
export const updateTask = (id: string, data: Partial<TaskFormData>) =>
  API.put<Task>(`/tasks/${id}`, data);
export const deleteTask = (id: string) => API.delete(`/tasks/${id}`);

// Daily Logs
export const fetchDailyLogs = (goalId: string) =>
  API.get<DailyLog[]>(`/daily-logs?goal=${goalId}`);
export const createDailyLog = (data: DailyLogFormData) =>
  API.post<DailyLog>("/daily-logs", data);
export const deleteDailyLog = (id: string) => API.delete(`/daily-logs/${id}`);

export default API;
