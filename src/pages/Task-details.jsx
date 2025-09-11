import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import TaskDetailsBoards from "../components/TaskDetailsBoards"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
      setTask(data)
    }
    fetchTask()
  }, [taskId])

  return (
    <div className="flex">
      <Sidebar />
      <TaskDetailsBoards task={task} />
    </div>
  )
}

export default TaskDetailsPage
