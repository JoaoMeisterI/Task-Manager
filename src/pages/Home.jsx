import Sidebar from "../components/Sidebar"
import TaskHeader from "../components/TaskHeader"
import DashboardCards from "../components/DashboardCards"
import TaskItem from "../components/TaskItem"
import { useGetTasks } from "../hooks/data/use-get-tasks"

const HomePage = () => {
  const { data: tasks } = useGetTasks()

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <TaskHeader titulo="Dashboard" />
        <DashboardCards />
        <div className="grid grid-cols-[1.5fr,1fr]">
          <div className="space-y-3 rounded-[10px] bg-white p-6">
            <div>
              <h3 className="text-xl font-semibold">Tarefas</h3>
              <span className="text-sm text-brand-dark-gray">
                Resumo das tarefas disponíveis
              </span>
            </div>

            <div className="space-y-3">
              {tasks?.map((task) => (
                <TaskItem key={task.id} tasks={task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
