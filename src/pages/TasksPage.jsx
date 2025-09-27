import { Toaster } from "sonner"
import Sidebar from "../components/Sidebar"
import Tasks from "../components/Tasks"

function TasksPage() {
  return (
    <div className="flex">
      <Toaster
        toastOptions={{
          style: {
            color: "#00ADB5",
          },
        }}
      />
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default TasksPage
