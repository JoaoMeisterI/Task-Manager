import InputLabel from "./InputLabel"

const TimeSelect = (props) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor="Horario">Horário</InputLabel>
      <select
        className="rounded-lg border border-solid border-[#ECECEC] bg-white px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  )
}

export default TimeSelect
