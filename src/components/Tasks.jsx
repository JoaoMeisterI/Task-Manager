import { SunIcon, CloudIcon, MoonIcon } from "../assets/icons"
import TasksSeparator from "./TasksSeparator"
import TaskItem from "./TaskItem"
import TaskHeader from "./TaskHeader"
import { useGetTasks } from "../hooks/data/use-get-tasks"

const Tasks = () => {
  const { data: tasks } = useGetTasks()
  const morningTasks = tasks?.filter((task) => task.time === "morning")
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon")
  const eveningTasks = tasks?.filter((task) => task.time === "evening")

  return (
    <div className="w-full px-8 py-16">
      <TaskHeader titulo="Minhas Tarefas" />
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks?.map((task) => (
            <TaskItem key={task.id} tasks={task} />
          ))}
        </div>
        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudIcon />} />
          {afternoonTasks?.map((task) => (
            <TaskItem key={task.id} tasks={task} />
          ))}
        </div>
        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks?.map((task) => (
            <TaskItem key={task.id} tasks={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
