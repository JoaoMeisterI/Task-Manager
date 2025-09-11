import PropTypes from "prop-types"
import { tv } from "tailwind-variants"

const SidebarButton = ({ children, variant }) => {
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
    <a href="#" className={sidebarStyle({ color: variant })}>
      {children}
    </a>
  )
}

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["selected", "unselected"]).isRequired,
}

export default SidebarButton
