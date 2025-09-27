import { SunIcon, CloudIcon, MoonIcon } from "../assets/icons"
import TasksSeparator from "./TasksSeparator"
import TaskItem from "./TaskItem"
import TaskHeader from "./TaskHeader"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import { taskQueryKeys } from "../keys/queries"

const Tasks = () => {
  const queryClient = useQueryClient()
  const { data: tasks } = useGetTasks()
  const morningTasks = tasks?.filter((task) => task.time === "morning")
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon")
  const eveningTasks = tasks?.filter((task) => task.time === "evening")

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

    queryClient.setQueryData(taskQueryKeys.getAll(), newTasks)
  }

  return (
    <div className="w-full px-8 py-16">
      <TaskHeader titulo="Minhas Tarefas" />
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              tasks={task}
              handleAlteraStatus={handleAlteraStatus}
            />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudIcon />} />
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              tasks={task}
              handleAlteraStatus={handleAlteraStatus}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              tasks={task}
              handleAlteraStatus={handleAlteraStatus}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
