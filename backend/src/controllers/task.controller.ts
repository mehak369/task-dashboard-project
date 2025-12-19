import { Request, Response } from "express";
import * as taskService from "../services/task.service";

export const create = async (req: any, res: Response) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    const assignedToId = req.userId; 


    if (!title || !assignedToId) {
      return res.status(400).json({ message: "Title and assignee required" });
    }

   const task = await taskService.createTask(
  title,
  description,
  dueDate,
  priority || "Medium",
  req.userId,     
  req.userId      
);


    return res.status(201).json(task);
  } catch (error: any) {
    console.error("CREATE TASK ERROR:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getAll = async (req: any, res: Response) => {
  try {
    const tasks = await taskService.getTasks(req.userId, req.query);
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: any, res: Response) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.body,
      req.userId
    );
    res.json(task);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: any, res: Response) => {
  try {
    await taskService.deleteTask(req.params.id, req.userId);
    res.json({ message: "Task deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
