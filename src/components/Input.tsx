import { ChangeEvent } from "react";

interface InputProps {
  text: string;
  placeholder: string;
  name: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  text = "",
  placeholder = "",
  name = "",
  handleChange,
}: InputProps) => {
  return (
    <div className="relative border-b border-gray-300 focus-within:border-gray-500 transition-all">
      <input
        type="text"
        value={text}
        name={name}
        autoComplete="off"
        onChange={handleChange}
        className="w-full outline-none focus:outline-none peer"
      />
      <label
        htmlFor={name}
        className="absolute top-0 left-0 bg-transparent pointer-events-none peer-focus:-translate-y-full peer-focus:text-sm transition-all duration-300"
      >
        {placeholder}
      </label>
    </div>
  );
};
