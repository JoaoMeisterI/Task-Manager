import { createPortal } from "react-dom"
import Input from "./Input"
import Button from "./Button"
import { CSSTransition } from "react-transition-group"
import { useEffect, useRef, useState } from "react"
import TimeSelect from "./TimeSelect"
import "./AddTaskDialog.css"
import { v4 } from "uuid"
import { LoaderIcon } from "../assets/icons"
import { toast } from "sonner"

// eslint-disable-next-line react/prop-types
const AddTaskDialog = ({ isOpen, handleDialogClose, handleSubmit }) => {
  const nodeRef = useRef(null)
  const [errors, setErrors] = useState([])
  const [isLoad, setLoad] = useState(false)
  const timeRef = useRef()
  const descriptionRef = useRef()
  const titleRef = useRef()

  useEffect(() => {}, [isOpen])

  const handleSaveClick = () => {
    const newErros = []

    const title = titleRef.current.value
    const description = descriptionRef.current.value
    const time = timeRef.current.value

    if (!title.trim()) {
      newErros.push({
        inputName: "title",
        message: "O Título é Obrigatório",
      })
    }

    if (!time.trim()) {
      newErros.push({
        inputName: "time",
        message: "O Tempo é Obrigatório",
      })
    }

    if (!description.trim()) {
      newErros.push({
        inputName: "description",
        message: "Descrição é Obrigatório",
      })
    }

    setErrors(newErros)

    if (newErros.length > 0) {
      return
    }

    handleSubmitTask(
      {
        id: v4(),
        title: title,
        time: time,
        description: description,
        status: "not_started",
      },
      handleDialogClose()
    )
  }

  const handleSubmitTask = async (newTask) => {
    setLoad(true)
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
    })
    console.log(response)
    if (!response.ok) {
      setLoad(false)
      return toast.error(
        "Erro ao adicionar a tarefa. Por favor, tente novamente"
      )
    }
    setLoad(false)
    handleSubmit(newTask)
  }

  const titleError = errors.find((error) => error.inputName === "title")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )
  const timeError = errors.find((error) => error.inputName === "time")

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      {/* O elemento que vai receber as classes precisa ser o root do modal */}
      <div
        ref={nodeRef}
        className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
      >
        <div className="rounded-xl bg-white p-5 text-center shadow">
          <h2 className="text-xl font-semibold text-brand-dark-blue">
            Nova Tarefa
          </h2>
          <p className="mt-1 text-sm text-brand-text-gray">
            Insira as Informações Abaixo
          </p>
          <div className="flex w-[336px] flex-col space-y-4">
            <Input
              id="title"
              label="Titulo"
              placeholder="Insira o título da tarefa"
              ref={titleRef}
            />
            {titleError && (
              <p className="text-left text-xs text-red-500">
                {titleError.message}
              </p>
            )}
            <TimeSelect ref={timeRef} />
            {timeError && (
              <p className="text-left text-xs text-red-500">
                {timeError.message}
              </p>
            )}
            <Input
              id="description"
              placeholder="Descreva a tarefa"
              ref={descriptionRef}
            />
            {descriptionError && (
              <p className="text-left text-xs text-red-500">
                {descriptionError.message}
              </p>
            )}
            <div className="flex gap-3">
              <Button
                size="large"
                variant="secondary"
                className="w-full"
                ref={timeRef}
                onClick={handleDialogClose}
              >
                Cancelar
              </Button>
              <Button
                size="large"
                className="w-full"
                onClick={handleSaveClick}
                variant="primary"
              >
                {isLoad && <LoaderIcon className="animate-spin" />}
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

export default AddTaskDialog
