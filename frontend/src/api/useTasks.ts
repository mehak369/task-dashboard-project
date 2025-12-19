import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, createTask, updateTask } from "./task.api";

export const useTasks = (filters?: {
  status?: string;
  priority?: string;
}) =>
  useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => fetchTasks(filters)
  });

export const useCreateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] })
  });
};

export const useUpdateTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] })
  });
};
