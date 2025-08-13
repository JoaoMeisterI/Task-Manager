import Button from "./Button"
import AddIcon from "../assets/icons/add.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"
import TasksSeparator from "./TasksSeparator"
import SunIcon from "../assets/icons/sun.svg?react"
import CloudIcon from "../assets/icons/cloud-sun.svg?react"
import MoonIcon from "../assets/icons/moon.svg?react"
import React from "react"
import TASKS from "../constants/Tasks"
import TaskItem from "./TaskItem"
import { toast } from "sonner"

const Tasks = () => {
  const [tasks, setTasks] = React.useState(TASKS)
  const morningTasks = tasks.filter((task) => task.time === "morning")
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon")
  const eveningTasks = tasks.filter((task) => task.time === "evening")
  const handleAlteraStatus = (tasks) => {
    let newStatus = "completed"

    if (tasks.status == "completed") {
      newStatus = "not_started"
    }

    if (tasks.status == "not_started") {
      newStatus = "in_progress"
    }

    setTasks((TASKS) =>
      TASKS.map((task) =>
        task.id === tasks.id ? { ...task, status: newStatus } : task
      )
    )
  }

  const handleRemoveItem = (id) => {
    setTasks((TASKS) => TASKS.filter((task) => task.id !== id))

    toast.success("Tarefa Removida Com Sucesso")
  }

  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secundary">
            Limpar Tarefas
            <TrashIcon />
          </Button>

          <Button>
            <AddIcon />
            Adicionar Tarefa
          </Button>
        </div>
      </div>
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              tasks={task}
              handleAlteraStatus={handleAlteraStatus}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              tasks={task}
              handleAlteraStatus={handleAlteraStatus}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              tasks={task}
              handleAlteraStatus={handleAlteraStatus}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
