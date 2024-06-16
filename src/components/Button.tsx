import { ButtonHTMLAttributes } from "react";
import { Loading } from "./Loading";

type ButtonProps = {
    title: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ title, ...buttonProps }: ButtonProps) => {
    return (
        <button
            className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 focus:outline-none mt-6"
            {...buttonProps}
        >
            {title}
        </button>
    );
};
