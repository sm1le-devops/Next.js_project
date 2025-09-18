import { Task } from "../types/task"   // импортируем тип Task
import { Button } from "./Button" 
import { useState } from "react"

type TaskItemProps = {
  task: Task
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onEdit: (id: number, newText: string) => void
}
export function TaskItem({ task, onDelete, onToggle, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  return (
    <div
      className={`flex justify-between items-center p-2 rounded mb-2 ${
        task.completed ? "bg-green-200" : "bg-white"
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={() => {
            onEdit(task.id, editText)
            setIsEditing(false)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEdit(task.id, editText)
              setIsEditing(false)
            }
          }}
          className="flex-1 px-2 py-1 border rounded"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 px-2 py-1 rounded cursor-pointer ${
            task.completed ? "line-through text-gray-600" : "text-black"
          }`}
          onClick={() => onToggle(task.id)}
          onDoubleClick={() => setIsEditing(true)}
        >
          {task.text}
        </span>
      )}
      <Button label="Удалить" onClick={() => onDelete(task.id)} />
    </div>
  )
}
