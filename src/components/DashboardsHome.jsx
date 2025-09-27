import Button from "./Button"
import {
  TrashIcon,
  AddIcon,
  TasksDoneIcon,
  TasksToDoIcon,
  WaterIcon,
  LoaderIcon,
} from "../assets/icons"
import AddTaskDialog from "./AddTaskDialog"
import { useState } from "react"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import TaskItem from "./TaskItem"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import WaterItem from "./WaterItem"

const DashboardsHome = () => {
  const queryClient = useQueryClient()
  const { data: tasks } = useGetTasks()
  const incompletedTasks = tasks?.filter(
    (task) => task.status != "completed" && task.time != "water"
  )
  const waterList = tasks?.filter((task) => task.time === "water")
  const [AddTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)
  const handleDialogClose = () => {
    setAddTaskDialogIsOpen(false)
  }

  const handleAlteraStatus = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      if (task.status === "not_started") {
        toast.success("Tarefa iniciada com sucesso!")
        return { ...task, status: "in_progress" }
      }

      if (task.status === "in_progress") {
        toast.success("Tarefa concluída com sucesso!")
        return { ...task, status: "completed" }
      }

      if (task.status === "completed") {
        toast.success("Tarefa reiniciada com sucesso!")
        return { ...task, status: "not_started" }
      }

      return task
    })

    queryClient.setQueryData(["tasks"], newTasks)
  }

  return (
    <div className="w-full px-8 py-16">
      <div className="mb-10 flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Início
          </span>
          <h2 className="text-xl font-semibold">Início</h2>
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
          />
        </div>
      </div>
      <div className="mb-6 flex min-h-48 w-full gap-12">
        <div className="flex w-1/4 flex-col items-center justify-center rounded-lg bg-white">
          <div className="flex items-center gap-4">
            <TasksToDoIcon className="text-brand-primary" />
            <p className="text-2xl font-bold">5</p>
          </div>
          <p className="text-lg font-light">Tarefas Disponíveis</p>
        </div>
        <div className="flex w-1/4 flex-col items-center justify-center rounded-lg bg-white">
          <div className="flex items-center gap-4">
            <TasksDoneIcon className="text-brand-primary" />
            <p className="text-2xl font-bold">2</p>
          </div>
          <p className="text-lg font-light">Tarefas Concluídas</p>
        </div>
        <div className="flex w-1/4 flex-col items-center justify-center rounded-lg bg-white">
          <div className="flex items-center gap-4">
            <LoaderIcon className="animate-spin text-brand-primary" />
            <p className="text-2xl font-bold">1</p>
          </div>
          <p className="text-lg font-light">Tarefas em Andamento</p>
        </div>
        <div className="flex w-1/4 flex-col items-center justify-center rounded-lg bg-white">
          <div className="flex items-center gap-4">
            <WaterIcon className="text-brand-primary" />
            <p className="text-2xl font-bold">40%</p>
          </div>
          <p className="text-lg font-light">Água</p>
        </div>
      </div>
      <div className="flex min-h-48 w-full gap-12">
        <div className="flex w-8/12 flex-col gap-6 rounded-lg bg-white p-6">
          <div>
            <h1 className="text-2xl font-semibold">Tarefas</h1>
            <p className="text-gray-500">Resumo das Tarefas Disponíveis</p>
          </div>
          <div className="rounded-xl">
            <div className="space-y-3">
              {incompletedTasks?.map((task) => (
                <TaskItem
                  key={task.id}
                  tasks={task}
                  handleAlteraStatus={handleAlteraStatus}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-5/12 flex-col gap-6 rounded-lg bg-white p-6">
          <div>
            <h1 className="text-2xl font-semibold">Água</h1>
            <p className="text-gray-500">Beba sua meta diária de água</p>
          </div>
          <div className="flex flex-row justify-between gap-6 rounded-xl">
            <div className="space-y-3">
              {waterList?.map((task) => (
                <WaterItem
                  key={task.id}
                  tasks={task}
                  handleAlteraStatus={handleAlteraStatus}
                />
              ))}
            </div>
            <div className="self-end">
              <p>sdasd</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardsHome
