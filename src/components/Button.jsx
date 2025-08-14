// eslint-disable-next-line react/prop-types
const Button = ({ children, variant = "primary", ...rest }) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white"
    }

    if (variant === "secundary") {
      return "bg-transparent text-[#818181]"
    }

    if (variant === "terciary") {
      return "bg-transparent bg-gray-400"
    }
  }

  return (
    <button
      className={`flex items-center gap-1 rounded-md px-3 py-1 text-xs font-semibold transition hover:opacity-75 ${getVariantClasses()}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
