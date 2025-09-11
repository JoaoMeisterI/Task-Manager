import { useState } from "react"
import { CheckIcon, LoaderIcon, TrashIcon, DetailsIcon } from "../assets/icons"
import Button from "./Button"
import { toast } from "sonner"
import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
const TaskItem = ({ tasks, handleAlteraStatus, handleRemoveItem }) => {
  const [updateIcon, setUpdateIcon] = useState(false)

  const deleteItem = async (taskId) => {
    console.log(taskId)
    setUpdateIcon(true)
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      setUpdateIcon(false)
      return toast.error("Erro ao Deletar a tarefa. Tente Novamente")
    }
    setUpdateIcon(false)
    handleRemoveItem(taskId)
  }

  const getStatusClasses = () => {
    if (tasks.status === "completed") {
      return "text-brand-primary bg-brand-primary"
    }
    if (tasks.status === "in_progress") {
      return "bg-brand-process text-brand-process"
    }
    if (tasks.status === "not_started") {
      return "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue"
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-4">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-white ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={tasks.status === "completed"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleAlteraStatus(tasks)}
          />
          {tasks.status === "completed" && <CheckIcon />}
          {tasks.status === "in_progress" && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>
        <p>{tasks.title}</p>
      </div>
      <div className="flex">
        <Button variant="secundary" onClick={() => deleteItem(tasks.id)}>
          {updateIcon ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <TrashIcon className="text-red-500" />
          )}
        </Button>
        <Link to={`/task/${tasks.id}`}>
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

export default TaskItem
