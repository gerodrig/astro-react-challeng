
interface Props {
    className: string;
}

const Loader = ({className = ""}: Props) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-t-4 border-blue-500 border-opacity-50"></div>
        <div className="ml-4 text-white">
          Loading
          <span className="animate-pulse">...</span>
        </div>
    </div>

  )
}

export default Loader