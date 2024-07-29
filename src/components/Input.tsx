import { ChangeEvent } from "react";

interface InputProps {
  value: string;
  placeholder: string;
  name: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  value = "",
  placeholder = "",
  name = "",
  handleChange,
}: InputProps) => {
  return (
    <div className="relative border-b border-gray-300 focus-within:border-gray-500 transition-all">
      <input
        type="text"
        value={value}
        name={name}
        autoComplete="off"
        onChange={handleChange}
        className="w-full outline-none focus:outline-none peer"
      />
      <label
        htmlFor={name}
        className="absolute top-0 left-0 bg-transparent pointer-events-none text-gray-500 peer-focus:-translate-y-full peer-focus:text-sm peer-focus:text-black transition-all duration-300"
      >
        {placeholder}
      </label>
    </div>
  );
};
