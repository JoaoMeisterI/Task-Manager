import { tv } from "tailwind-variants"

/* eslint-disable react/prop-types */

const Button = ({ children, variant, size, className, ...rest }) => {
  const buttonStyle = tv({
    base: "flex items-center gap-1 justify-center rounded-md px-3 font-semibold transition hover:opacity-75",
    variants: {
      variant: {
        primary: "bg-brand-primary text-white",
        ghost: "bg-transparent text-brand-dark-gray",
        secondary: "bg-brand-light-gray text-brand-dark-blue",
        terciary: "bg-brand-danger text-white",
        gray: "bg-brand-light-gray text-black",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "small",
    },
  })
  return (
    <button className={buttonStyle({ variant, size, className })} {...rest}>
      {children}
    </button>
  )
}

export default Button
