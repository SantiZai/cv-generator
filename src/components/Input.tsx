import { ChangeEvent } from "react";

interface InputProps {
  value: string | number;
  placeholder: string;
  name: string;
  type?: string;
  maxLength?: number;
  className?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  value = "",
  placeholder = "",
  name = "",
  type = "text",
  maxLength,
  className,
  handleChange,
}: InputProps) => {
  return (
    <div
      className={`w-full relative border-b border-gray-300 focus-within:border-gray-500 transition-all ${className}`}
    >
      <input
        type={type}
        value={value}
        name={name}
        autoComplete="off"
        maxLength={maxLength}
        onChange={handleChange}
        className="w-full outline-none focus:outline-none peer"
        max={10}
      />
      <label
        htmlFor={name}
        className={`absolute top-0 left-0 transition-all duration-300 pointer-events-none
          ${
            value
              ? "-translate-y-full text-sm text-black"
              : "top-0 text-gray-500"
          }
          peer-focus:-translate-y-full peer-focus:text-sm peer-focus:text-black`}
      >
        {placeholder}
      </label>
    </div>
  );
};
