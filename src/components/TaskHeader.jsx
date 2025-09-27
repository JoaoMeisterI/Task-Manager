/* eslint-disable react/prop-types */
import Button from "./Button"
import AddTaskDialog from "./AddTaskDialog"
import { TrashIcon, AddIcon } from "../assets/icons"
import { useState } from "react"

const TaskHeader = (props) => {
  const [AddTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)
  const handleDialogClose = () => {
    setAddTaskDialogIsOpen(false)
  }
  return (
    <div className="mb-8 flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {props.titulo}
        </span>
        <h2 className="text-xl font-semibold">{props.titulo}</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="secundary">
          Limpar Tarefas
          <TrashIcon />
        </Button>

        <Button onClick={() => setAddTaskDialogIsOpen(true)} variant="primary">
          <AddIcon />
          Adicionar Tarefa
        </Button>

        <AddTaskDialog
          isOpen={AddTaskDialogIsOpen}
          handleDialogClose={handleDialogClose}
        />
      </div>
    </div>
  )
}

export default TaskHeader
