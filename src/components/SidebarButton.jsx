/* eslint-disable no-unused-vars */
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import { tv } from "tailwind-variants"

const SidebarButton = ({ children, variant, href }) => {
  const sidebarStyle = tv({
    base: "flex h-10 p-2 gap-4 items-center",
    variants: {
      color: {
        unselected: "text-brand-dark-blue",
        selected: "rounded-lg bg-[#E6F7F8] text-brand-primary",
      },
    },
    defaultVariants: {
      color: "unselected",
    },
  })

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        sidebarStyle({ color: isActive ? "selected" : "unselected" })
      }
    >
      {children}
    </NavLink>
  )
}

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["selected", "unselected"]).isRequired,
  href: PropTypes.string, // opcional, mas recomendado declarar
}

export default SidebarButton
