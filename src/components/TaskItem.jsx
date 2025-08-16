import { CheckIcon, LoaderIcon, TrashIcon, DetailsIcon } from "../assets/icons"
import Button from "./Button"

/* eslint-disable react/prop-types */
const TaskItem = ({ tasks, handleAlteraStatus, handleRemoveItem }) => {
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
            onChange={() => handleAlteraStatus(tasks)}
          />
          {tasks.status === "completed" && <CheckIcon />}
          {tasks.status === "in_progress" && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>
        <p>{tasks.title}</p>
      </div>
      <div className="flex">
        <Button variant="secundary" onClick={() => handleRemoveItem(tasks.id)}>
          <TrashIcon className="text-red-500" />
        </Button>
        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  )
}

export default TaskItem
