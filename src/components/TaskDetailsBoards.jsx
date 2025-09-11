import { Link, useNavigate } from "react-router-dom"
import { ArrowIcon } from "../assets/icons"
import Button from "./Button"
import { TrashIcon } from "../assets/icons"
import Input from "./Input"
import TimeSelect from "./TimeSelect"
import { useRef } from "react"
import { toast } from "sonner"

// eslint-disable-next-line react/prop-types
const TaskDetailsBoards = ({ task }) => {
  const descriptionRef = useRef()
  const titleRef = useRef()
  const timeRef = useRef()
  const navigate = useNavigate()

  const handleSalvarTask = async () => {
    const updateTask = {
      // eslint-disable-next-line react/prop-types
      id: task.id,
      title: titleRef.current.value,
      time: timeRef.current.value,
      description: descriptionRef.current.value,
      // eslint-disable-next-line react/prop-types
      status: task.status,
    }

    // eslint-disable-next-line react/prop-types
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(updateTask),
    })

    if (!response.ok) {
      return toast.error("Erro ao atualizar Tarefa, Tente Novamente")
    }

    toast.success("Tarefa atualizada com sucesso!")
    navigate("/")
  }

  const handleDeleteTask = async () => {
    // eslint-disable-next-line react/prop-types
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      return toast.error("Erro ao atualizar Tarefa, Tente Novamente")
    }

    toast.success("Tarefa Removida com sucesso!")
    navigate("/")
  }

  return (
    <div className="m-10 w-full">
      <div>
        <Link to={`/`}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary">
            <ArrowIcon className="size-5" />
          </div>
        </Link>
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
      <div className="mt-6 rounded-sm bg-brand-white p-4">
        <div className="flex flex-col space-y-4">
          <Input
            id="title"
            label="Nome"
            ref={titleRef}
            // eslint-disable-next-line react/prop-types
            defaultValue={task?.title}
          />

          {/* eslint-disable-next-line react/prop-types */}
          <TimeSelect ref={timeRef} defaultValue={task?.time} />
          <Input
            id="descricao"
            label="Descrição"
            ref={descriptionRef}
            // eslint-disable-next-line react/prop-types
            defaultValue={task?.description}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <Button variant="gray" size="large">
          <Link to="/">Cancelar</Link>
        </Button>
        <Button variant="primary" size="large" onClick={handleSalvarTask}>
          Salvar
        </Button>
      </div>
    </div>
  )
}

export default TaskDetailsBoards
