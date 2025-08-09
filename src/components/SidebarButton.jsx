import PropTypes from "prop-types"

const SidebarButton = ({ children, variant }) => {
  const getVariantClasses = () => {
    if (variant === "unselected") {
      return "text-[#35383E]"
    }

    if (variant === "selected") {
      return "rounded-lg bg-[#E6F7F8] text-[#00ADB5]"
    }
  }

  return (
    <a
      href="#"
      className={`flex items-center gap-2 px-6 py-3 ${getVariantClasses()}`}
    >
      {children}
    </a>
  )
}

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["selected", "unselected"]).isRequired,
}

export default SidebarButton
