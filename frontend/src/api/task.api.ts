import api from "./axios";

export const fetchTasks = async (params?: any) => {
  const res = await api.get("/tasks", { params });
  return res.data;
};

export const createTask = async (data: any) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const updateTask = async ({
  id,
  updates
}: {
  id: string;
  updates: any;
}) => {
  const res = await api.put(`/tasks/${id}`, updates);
  return res.data;
};
