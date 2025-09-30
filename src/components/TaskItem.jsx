import { CheckIcon, LoaderIcon, TrashIcon, DetailsIcon } from "../assets/icons"
import Button from "./Button"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { useDeleteTasks } from "../hooks/data/use-delete-tasks"
import { useUpdateTask } from "../hooks/data/use-update-tasks"

/* eslint-disable react/prop-types */
const TaskItem = ({ tasks }) => {
  const { mutate, isPeding } = useDeleteTasks(tasks?.id)
  const { mutate: updateTask } = useUpdateTask(tasks?.id)

  const deleteItem = async () => {
    mutate(undefined, {
      onSuccess: () => {
        toast.success("Tarefa Removida com Sucesso")
      },
      onError: () => {
        toast.error("Erro ao deletar a tarefa")
      },
    })
  }

  const getStatusClasses = () => {
    if (tasks?.status === "completed") {
      return "text-brand-primary bg-brand-primary"
    }
    if (tasks?.status === "in_progress") {
      return "bg-brand-process text-brand-process"
    }
    if (tasks?.status === "not_started") {
      return "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue"
    }
  }

  const getNewStatus = () => {
    if (tasks?.status === "not_started") {
      return "in_progress"
    }
    if (tasks?.status === "in_progress") {
      return "completed"
    }
    return "not_started"
  }

  const handleCheckboxClick = () => {
    updateTask(
      {
        status: getNewStatus(),
      },
      {
        onSuccess: () =>
          toast.sucess("Status da tarefa atualizado com sucesso!"),
        onError: () =>
          toast.error(
            "Erro ao atualizar status da tarefa. Por favor, tente novamente"
          ),
      }
    )
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
            checked={tasks?.status === "completed"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleCheckboxClick}
          />
          {tasks?.status === "completed" && <CheckIcon />}
          {tasks?.status === "in_progress" && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>
        <p>{tasks?.title}</p>
      </div>
      <div className="flex">
        <Button variant="secundary" onClick={() => deleteItem()}>
          {isPeding ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <TrashIcon className="text-red-500" />
          )}
        </Button>
        <Link to={`/task/${tasks?.id}`}>
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

export default TaskItem
