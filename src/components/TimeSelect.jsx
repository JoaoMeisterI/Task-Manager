import { forwardRef } from "react"
import InputLabel from "./InputLabel"

const TimeSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={"Horario"}>Horário</InputLabel>
      <select
        ref={ref}
        className="rounded-lg border border-solid border-[#ECECEC] bg-white px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  )
})
TimeSelect.displayName = "TimeSelect"

export default TimeSelect
