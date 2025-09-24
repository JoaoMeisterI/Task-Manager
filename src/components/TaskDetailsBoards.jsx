/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom"
import { ArrowIcon } from "../assets/icons"
import Button from "./Button"
import { TrashIcon } from "../assets/icons"
import Input from "./Input"
import TimeSelect from "./TimeSelect"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import {
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { useUpdateTask } from "../hooks/data/use-update-tasks"
import { useDeleteTasks } from "../hooks/data/use-delete-tasks"

// eslint-disable-next-line react/prop-types
const TaskDetailsBoards = ({ task }) => {
  const timeRef = useRef()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: updateTask } = useUpdateTask(task?.id)
  const { mutate: deleteTask } = useDeleteTasks(task?.id)

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: task?.title,
      description: task?.description,
    },
  })

  //esse reset a gente usa para atribuir valores no forms quando da primeira vez o valor setado não está com o valor que precisa
  useEffect(() => {
    reset({
      title: task?.title,
      description: task?.description,
    })
  }, [task, reset])

  //ele usou esse navigate -1 no lugar de um link
  const handleButtonReturn = () => {
    navigate(-1)
    ;("")
  }

  //o data é os valores do input no formulário
  const handleSalvarTask = async (data) => {
    const updateNTask = {
      // eslint-disable-next-line react/prop-types
      id: task.id,
      title: data.title,
      time: timeRef.current.value,
      description: data.description,
      // eslint-disable-next-line react/prop-types
      status: task.status,
    }
    // eslint-disable-next-line react/prop-types
    toast.success("Tarefa atualizada com sucesso!")

    updateTask(updateNTask, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso!")
      },
      onError: () => {
        toast.error("Erro ao atualizar a tarefa")
      },
    })

    navigate("/")
  }

  const handleDeleteTask = async () => {
    // eslint-disable-next-line react/prop-types

    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa Removida com Sucesso")
      },
      onError: () => {
        toast.error("Erro ao deletar a tarefa")
      },
    })

    toast.success("Tarefa Removida com sucesso!")
    navigate("/")
  }

  return (
    <div className="m-10 w-full">
      <div>
        <Button
          onClick={handleButtonReturn}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary"
        >
          <ArrowIcon className="size-5" />
        </Button>
        <div className="mt-5 flex gap-2">
          <p className="text-brand-text-gray">Minhas Tarefas -- </p>
          <p className="font-semibold text-brand-primary">Ir para Academia</p>
        </div>
        <div className="mt-5 flex justify-between gap-2">
          <h2 className="text-3xl font-semibold text-black">
            Ir Para Academia
          </h2>
          <Button variant="terciary" size="large" onClick={handleDeleteTask}>
            <TrashIcon className="" />
            Deletar Tarefa
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleSalvarTask)}>
        <div className="mt-6 rounded-sm bg-brand-white p-4">
          <div className="flex flex-col space-y-4">
            <Input
              id="title"
              label="Nome"
              // eslint-disable-next-line react/prop-types
              //Registrando o campo do formulário e colocando validações
              {...register("title", {
                required: "O Título é Obrigatório",
                validate: (value) => {
                  if (!value.trim()) {
                    return "O título não pode ser vazio."
                  }
                  return true
                },
              })}
            />
            <p>{errors?.title?.message}</p>
            {/* eslint-disable-next-line react/prop-types */}
            <TimeSelect defaultValue={task?.time} ref={timeRef} />
            <Input
              id="descricao"
              label="Descrição"
              // eslint-disable-next-line react/prop-types
              {...register("description", {
                required: "A descrição é obrigatória",
              })}
            />
            <p>{errors?.description?.message}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <Button variant="gray" size="large">
            <Link to="/">Cancelar</Link>
          </Button>
          <Button variant="primary" size="large" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TaskDetailsBoards
