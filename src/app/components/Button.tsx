type ButtonProps = {
  label: string
  onClick?: () => void
}

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {label}
    </button>
  )
}
