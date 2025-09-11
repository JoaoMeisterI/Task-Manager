import { forwardRef } from "react"
import InputLabel from "./InputLabel"

// eslint-disable-next-line react/prop-types
const Input = forwardRef(({ label, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-[#A9AC9F]"
        ref={ref}
        {...rest}
      />
    </div>
  )
})

Input.displayName = "Input"

export default Input
