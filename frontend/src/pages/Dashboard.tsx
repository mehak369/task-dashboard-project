import { useEffect, useState } from "react";
import {
  useTasks,
  useUpdateTask,
  useCreateTask
} from "../api/useTasks";
import { socket } from "../lib/socket";

const Dashboard = () => {

  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");

  const { data: tasks, isLoading, refetch } = useTasks({
    status: filterStatus,
    priority: filterPriority
  });

  const { mutate: updateTask } = useUpdateTask();
  const { mutate: createTask, isPending } = useCreateTask();

  useEffect(() => {
    socket.on("taskUpdated", refetch);
    socket.on("taskAssigned", refetch);

    return () => {
      socket.off("taskUpdated");
      socket.off("taskAssigned");
    };
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  const overdueTasks =
    tasks?.filter(
      (t: any) =>
        new Date(t.dueDate) < new Date() && t.status !== "Completed"
    ) || [];

  const handleCreateTask = () => {
    if (!title) {
      alert("Title is required");
      return;
    }

    createTask(
      {
        title,
        description,
        dueDate,
        priority,
        status
      },
      {
        onSuccess: () => {
          refetch();
        }
      }
    );

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Medium");
    setStatus("To Do");
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case "Urgent":
        return "text-red-400 bg-red-400/10";
      case "High":
        return "text-orange-400 bg-orange-400/10";
      case "Medium":
        return "text-blue-400 bg-blue-400/10";
      default:
        return "text-slate-400 bg-slate-400/10";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        <header className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Task Dashboard</h1>
            <p className="text-slate-400">
              Create, track and manage your work
            </p>
          </div>

          <div className="flex gap-3">
            <select
              className="bg-slate-900 border border-slate-800 rounded px-3 py-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Review</option>
              <option>Completed</option>
            </select>

            <select
              className="bg-slate-900 border border-slate-800 rounded px-3 py-2"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">All Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Create Task</h2>

            <div className="space-y-3">
              <input
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="date"
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <select
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>

              <select
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Completed</option>
              </select>

              <button
                onClick={handleCreateTask}
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded"
              >
                {isPending ? "Creating..." : "Add Task"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">

            {overdueTasks.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded">
                <h3 className="text-red-400 font-semibold mb-2">
                  Overdue Tasks
                </h3>
                {overdueTasks.map((t: any) => (
                  <p key={t._id}>{t.title}</p>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks?.map((task: any) => (
                <div
                  key={task._id}
                  className="bg-slate-900 border border-slate-800 rounded p-4"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">{task.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <p className="text-sm text-slate-400 mb-3">
                    {task.description || "No description"}
                  </p>

                  <div className="flex justify-between items-center">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateTask({
                          id: task._id,
                          updates: { status: e.target.value }
                        })
                      }
                      className="bg-transparent text-sm"
                    >
                      <option>To Do</option>
                      <option>In Progress</option>
                      <option>Review</option>
                      <option>Completed</option>
                    </select>

                    <span className="text-xs text-slate-500">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {tasks?.length === 0 && (
              <p className="text-center text-slate-500">
                No tasks found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
