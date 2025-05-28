function FormInput({ text, type, required, onChange }) {
  return (
    <div className="relative z-0 w-full mb-3 col-span-1">
      <input
        type={type}
        placeholder=" "
        required={required}
        onChange={onChange}
        className="peer block w-full appearance-none border-b-[2px] border-white bg-transparent pt-6 pb-2 text-sm text-[var(--color-gray-100)] focus:border-[var(--color-blue-400)] focus:outline-none focus:ring-0"
      />
      <label className="absolute top-2 left-0 transform text-base text-[var(--color-gray-100)] transition-all duration-300 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-top-1 peer-focus:text-[var(--color-gray-300)]">
        {text}
      </label>
    </div>
  );
}

export default FormInput;
