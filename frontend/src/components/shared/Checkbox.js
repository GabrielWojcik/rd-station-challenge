function Checkbox({
  children,
  checked,
  className,
  type = 'checkbox',
  ...props
}) {
  return (
    <label
      className={`flex items-center p-4 mb-2 rounded-lg border-2 cursor-pointer transition-colors ${
        checked
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-blue-300'
      }`}
    >
      <input type={type} className="sr-only" checked={checked} {...props} />
      {checked ? (
        <img
          src="/assets/check_box.svg"
          alt="Selecionado"
          className="h-4 w-4 flex-shrink-0"
        />
      ) : (
        <div className="h-4 w-4 border-2 border-gray-400 rounded flex-shrink-0" />
      )}
      <span className="ml-3 text-gray-700">{children}</span>
    </label>
  );
}

export default Checkbox;
