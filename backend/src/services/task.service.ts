import Task from "../models/Task";
import User from "../models/User";
import mongoose from "mongoose";
import { getIO } from "../config/socket";

export const createTask = async (
  title: string,
  description: string,
  dueDate: Date,
  priority: string,
  creatorId: string,
  assignedToId: string
) => {
  if (!mongoose.Types.ObjectId.isValid(assignedToId)) {
    throw new Error("Invalid assignee");
  }

  const assignee = await User.findById(assignedToId);
  if (!assignee) {
    throw new Error("Assigned user not found");
  }

  const task = await Task.create({
    title,
    description,
    dueDate,
    priority,
    creatorId,
    assignedToId
  });
  const io = getIO();

    io.to(`user:${assignedToId}`).emit("taskAssigned", {
    message: "A new task was assigned to you"
    });

  return task;
};

export const getTasks = async (userId: string, filters: any) => {
  const query: any = {
    $or: [{ creatorId: userId }, { assignedToId: userId }]
  };

  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;

  return Task.find(query)
    .sort(filters.sort === "dueDate" ? { dueDate: 1 } : {})
    .populate("creatorId", "name email")
    .populate("assignedToId", "name email");
};

export const updateTask = async (
  taskId: string,
  updates: any,
  userId: string
) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");

  if (
    task.creatorId.toString() !== userId &&
    task.assignedToId.toString() !== userId
  ) {
    throw new Error("Not authorized to update this task");
  }

  Object.assign(task, updates);
  await task.save();
  const io = getIO();

    io.emit("taskUpdated", {
    taskId: task._id,
    updates
    });

  return task;
};

export const deleteTask = async (taskId: string, userId: string) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");

  if (task.creatorId.toString() !== userId) {
    throw new Error("Only creator can delete task");
  }

  await task.deleteOne();
};
