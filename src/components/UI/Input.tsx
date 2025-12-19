import { type FC, type InputHTMLAttributes } from "react";
import cn from "classnames";

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input: FC<IProps> = ({ className, ...rest }) => {
  return (
    <input
      { ...rest }
      className={cn('px-4 py-2 bg-white text-black font-bold rounded-full w-full', className)}
    />
  )
}

export default Input;
