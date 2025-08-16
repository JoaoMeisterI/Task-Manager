/* eslint-disable react/prop-types */

const Button = ({ children, variant = "primary", size = "small", className, ...rest }) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white"
    }

    if (variant === "secundary") {
      return "bg-transparent text-[#818181]"
    }

    if (variant === "terciary") {
      return "bg-[#EEEEEE] text-[#35383E]"
    }
  }

  const getSizeClasses = () => {
    if (size === 'small') {
      return "py-1 text-xs"
    }

    if (size === 'large') {
      return "py-2 text-sm"
    }

  }

  return (
    <button
      className={`flex items-center gap-1 justify-center rounded-md px-3 ${className} ${getSizeClasses()} font-semibold transition hover:opacity-75 ${getVariantClasses()}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
