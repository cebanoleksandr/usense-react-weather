import cn from "classnames";
import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button: FC<IProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={cn(
        className, 
        'box-border px-3 py-2 cursor-pointer text-center rounded-xl text-sm',
        'hover:bg-blue-800 active:bg-blue-700',
        'transition duration-300 bg-blue-900 text-white'
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
