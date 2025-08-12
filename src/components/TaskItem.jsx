import CheckIcon from "../assets/icons/check.svg?react"
import LoadIcon from "../assets/icons/loader.svg?react"
import DetailsIcons from "../assets/icons/details.svg?react"

/* eslint-disable react/prop-types */
const TaskItem = ({ tasks }) => {
  const getStatusClasses = () => {
    if (tasks.status === "completed") {
      return "text-[#00ADB5] bg-[#00ADB5]"
    }
    if (tasks.status === "in_progress") {
      return "bg-[#FFAA04] text-[#FFAA04]"
    }
    if (tasks.status === "not_started") {
      return "bg-[#35383E] bg-opacity-10 text-[#35383E]"
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-4">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-white ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={tasks.status === "completed"}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />
          {tasks.status === "completed" && <CheckIcon />}
          {tasks.status === "in_progress" && (
            <LoadIcon className="animate-spin" />
          )}
        </label>
        <p>{tasks.title}</p>
      </div>
      <a href="#" className="transition hover:opacity-75">
        <DetailsIcons />
      </a>
    </div>
  )
}

export default TaskItem
