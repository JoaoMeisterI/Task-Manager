// eslint-disable-next-line react/prop-types
const TasksSeparator = ({ title, icon }) => {
  return (
    <div className="flex gap-2 border-b border-solid border-[#F4F4F5]">
      {icon}
      <p className="text-sm text-[#9A9C9F]">{title}</p>
    </div>
  )
}

//COMPOSITION PATTERN
//const TasksSeparatorTitle = ({children}) => {
// return <p className="text-sm">{children}</p>
//}

export default TasksSeparator
