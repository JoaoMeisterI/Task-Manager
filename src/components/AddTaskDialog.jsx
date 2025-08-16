import { createPortal } from "react-dom"
import Input from "./Input"
import Button from "./Button"
import { CSSTransition } from "react-transition-group"
import { useRef } from "react"
import TimeSelect from "./TimeSelect"
import "./AddTaskDialog.css"

// eslint-disable-next-line react/prop-types
const AddTaskDialog = ({ isOpen, handleDialogClose }) => {
  const nodeRef = useRef(null)

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
          <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
          <p className="mt-1 text-sm text-[#9A9C9F]">
            Insira as Informações Abaixo
          </p>
          <div className="flex w-[336px] flex-col space-y-4">
            <Input
              id="title"
              label="Titulo"
              placeholder="Insira o título da tarefa"
            />
            <TimeSelect />
            <Input id="description" placeholder="Descreva a tarefa" />
            <div className="flex gap-3">
              <Button
                size="large"
                variant="terciary"
                className="w-full"
                onClick={handleDialogClose}
              >
                Cancelar
              </Button>
              <Button size="large" className="w-full">
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
