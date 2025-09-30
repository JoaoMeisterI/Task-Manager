import DashboardCard from "../components/DashboardCard"
import {
  TasksDoneIcon,
  LoaderIcon,
  WaterIcon,
  TasksIcon,
} from "../assets/icons"
import { useGetTasks } from "../hooks/data/use-get-tasks"

const DashboardCards = () => {
  const { data: tasks } = useGetTasks()

  const inProgressesTask = tasks?.filter(
    (task) => task?.status === "in_progress"
  ).length

  const completedStartedTask = tasks?.filter(
    (task) => task?.status === "completed"
  ).length

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<TasksIcon />}
        mainText={tasks?.length}
        secondaryText="Tarefas disponíveis"
      />
      <DashboardCard
        icon={<TasksDoneIcon />}
        mainText={completedStartedTask}
        secondaryText="Tarefas concluídas"
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={inProgressesTask}
        secondaryText="Tarefas em andamento"
      />
      <DashboardCard icon={<WaterIcon />} mainText="5" secondaryText="Água" />
    </div>
  )
}

export default DashboardCards
