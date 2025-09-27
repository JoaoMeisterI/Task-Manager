import { CheckIcon, LoaderIcon } from "../assets/icons"
import Button from "./Button"

/* eslint-disable react/prop-types */
const WaterItem = ({ tasks, handleAlteraStatus }) => {
  const getStatusClasses = () => {
    if (tasks.status === "completed") {
      return "text-brand-primary bg-brand-primary"
    }
    if (tasks.status === "in_progress") {
      return "bg-brand-process text-brand-process"
    }
    if (tasks.status === "not_started") {
      return "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue"
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
            onChange={() => handleAlteraStatus(tasks.id)}
          />
          {tasks.status === "completed" && <CheckIcon />}
          {tasks.status === "in_progress" && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>
        <p>{tasks.title}</p>
      </div>
      <div className="flex">
        <Button variant="secundary" />
      </div>
    </div>
  )
}

export default WaterItem
