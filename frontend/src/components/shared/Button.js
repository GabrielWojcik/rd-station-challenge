function Button({
  text,
  type = 'button',
  variant = 'primary',
  disabled,
  onClick,
}) {
  const baseStyles = 'font-bold py-2 px-4 rounded-xl w-full transition-colors';

  const variants = {
    primary: disabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-[#005A87] hover:bg-[#004566] text-white',
    secondary: 'border-2 border-gray-300 text-gray-600 hover:bg-gray-100',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {text}
    </button>
  );
}

export default Button;
