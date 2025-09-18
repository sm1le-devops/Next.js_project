"use client"

import { useState, useEffect } from "react"
import { Task } from "./types/task"
import { TaskItem } from "./components/TaskItem"
import { Input } from "./components/Input"
import { Button } from "./components/Button"

type Filter = "all" | "active" | "completed"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [filter, setFilter] = useState<Filter>("all")

  // Загружаем задачи из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks")
    if (saved) setTasks(JSON.parse(saved))
  }, [])

  // Сохраняем задачи в localStorage при изменениях
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // Добавление новой задачи
  const addTask = () => {
    if (!newTask) return
    const task: Task = { id: Date.now(), text: newTask, completed: false }
    setTasks([...tasks, task])
    setNewTask("")
  }

  // Редактирование задачи
  const editTask = (id: number, newText: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t))
  }

  // Фильтруем задачи
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  return (
    <main className="flex flex-col items-center p-4 min-h-screen bg-blue-50">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      {/* Поле ввода и кнопка добавления */}
      <div className="flex gap-2 mb-4 w-full max-w-md">
        <Input value={newTask} onChange={setNewTask} placeholder="Новая задача" />
        <Button label="Добавить" onClick={addTask} />
      </div>

      {/* Кнопки фильтров */}
      <div className="flex gap-2 mb-4">
        {["all", "active", "completed"].map(f => (
          <Button
            key={f}
            label={f}
            onClick={() => setFilter(f as Filter)}
          />
        ))}
      </div>

      {/* Счётчик невыполненных задач */}
      <p className="mb-2">{tasks.filter(t => !t.completed).length} задач осталось</p>

      {/* Список задач */}
      <div className="w-full max-w-md">
        {filteredTasks.length === 0 && <p>Список пуст</p>}
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={(id) => setTasks(tasks.filter(t => t.id !== id))}
            onToggle={(id) =>
              setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
            }
            onEdit={editTask}
          />
        ))}
      </div>
    </main>
  )
}
