/* eslint-disable react/prop-types */
const TaskItem = ({ tasks }) => {
  const getStatusClasses = () => {
    if (tasks.status === "completed") {
      return "text-[#00ADB5] bg-[#00ADB5] bg-opacity-10"
    }
    if (tasks.status === "in_progress") {
      return "bg-[#FFAA04] bg-opacity-10 text-[#FFAA04]"
    }
    if (tasks.status === "not_started") {
      return "bg-[#35383E] bg-opacity-10 text-[#35383E]"
    }
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      <p>{tasks.title}</p>
    </div>
  )
}

export default TaskItem
