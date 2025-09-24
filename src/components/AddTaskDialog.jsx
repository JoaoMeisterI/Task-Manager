import { createPortal } from "react-dom"
import Input from "./Input"
import Button from "./Button"
import { CSSTransition } from "react-transition-group"
import { useRef } from "react"
import TimeSelect from "./TimeSelect"
import "./AddTaskDialog.css"
import { v4 } from "uuid"
import { LoaderIcon } from "../assets/icons"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useAddTasks } from "../hooks/data/use-add-tasks"

// eslint-disable-next-line react/prop-types
const AddTaskDialog = ({ isOpen, handleDialogClose }) => {
  const nodeRef = useRef(null)
  const { mutate } = useAddTasks()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      time: "morning",
    },
  })

  const handleSaveClick = (data) => {
    handleSubmitTask(
      {
        id: v4(),
        title: data.title,
        time: data.time,
        description: data.description,
        status: "not_started",
      },
      handleDialogClose()
    )
  }

  const handleSubmitTask = async (newTask) => {
    mutate(newTask, {
      onSuccess: () => {
        toast.success("Tarefa Adicionada com Sucesso")
        reset()
      },
      onError: () => {
        toast.error("Erro ao Adicionar a Tarefa")
      },
    })
  }

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
        <form onSubmit={handleSubmit(handleSaveClick)}>
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
                {...register("title", {
                  required: "O Título é Obrigatório",
                })}
              />
              <p>{errors?.title?.message}</p>
              <TimeSelect {...register("time")} />
              <Input
                id="description"
                placeholder="Descreva a tarefa"
                {...register("description", {
                  required: "A Descrição é Obrigatória",
                })}
              />
              <p>{errors?.description?.message}</p>
              <div className="flex gap-3">
                <Button
                  size="large"
                  variant="secondary"
                  className="w-full"
                  onClick={handleDialogClose}
                >
                  Cancelar
                </Button>
                <Button
                  size="large"
                  className="w-full"
                  variant="primary"
                  type="submit"
                >
                  {isSubmitting && <LoaderIcon className="animate-spin" />}
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </CSSTransition>,
    document.body
  )
}

export default AddTaskDialog
