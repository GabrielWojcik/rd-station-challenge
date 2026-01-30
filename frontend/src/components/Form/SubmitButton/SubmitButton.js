function SubmitButton({ text, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`font-bold p-4 rounded-xl w-full ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-[#005A87] hover:bg-[#004566] text-white'
      }`}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
