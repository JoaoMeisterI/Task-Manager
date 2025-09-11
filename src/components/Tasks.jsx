import {
  AddIcon,
  SunIcon,
  TrashIcon,
  CloudIcon,
  MoonIcon,
} from "../assets/icons"
import TasksSeparator from "./TasksSeparator"
import Button from "./Button"
import { useEffect, useState } from "react"
import TaskItem from "./TaskItem"
import AddTaskDialog from "./AddTaskDialog"
import { toast } from "sonner"

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [AddTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)
  const morningTasks = tasks.filter((task) => task.time === "morning")
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon")
  const eveningTasks = tasks.filter((task) => task.time === "evening")

  //fazendo o unmounting do componente
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      })
      const tasks = await response.json()
      setTasks(tasks)
    }
    fetchTasks()
  }, [])

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

  const handleDialogClose = () => {
    setAddTaskDialogIsOpen(false)
  }

  const handleAddTask = async (newTask) => {
    console.log("task nova")
    console.log(newTask)
    setTasks([...tasks, newTask])
    toast.success("Tarefa adicionada com sucesso!")
  }

  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secundary">
            Limpar Tarefas
            <TrashIcon />
          </Button>

          <Button
            onClick={() => setAddTaskDialogIsOpen(true)}
            variant="primary"
          >
            <AddIcon />
            Adicionar Tarefa
          </Button>

          <AddTaskDialog
            isOpen={AddTaskDialogIsOpen}
            handleDialogClose={handleDialogClose}
            handleSubmit={handleAddTask}
          />
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
