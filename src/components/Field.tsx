import { type InputHTMLAttributes, forwardRef } from "react";
import { Error } from "./Error";

type FieldProps = {
    inputId: string;
    label: string;
    error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Field = forwardRef<HTMLInputElement, FieldProps>(({ inputId, label, error, ...rest }, ref) => (
    <div data-testid={`${inputId}-field`} className="py-2">
        <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900">
            {label}
        </label>
        <input
            id={inputId}
            className="w-full text-sm p-3 rounded outline-none border-2 focus:border-blue-500"
            {...rest}
            ref={ref}
        />
        {error && (
            <div className="pt-2">
                <Error message={error} />
            </div>
        )}
    </div>
));

Field.displayName = "Field";
