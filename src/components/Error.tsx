type ErrorProps = {
    message?: string;
};

export const Error = ({ message }: ErrorProps) => (
    <div className="text-sm text-red-600">{message || "Something went wrong!"}</div>
);
