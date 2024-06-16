import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="text-xl pb-4">Page not found</div>
            <span className="text-blue-600 hover:underline">
                <Link href="/login">Go to login page</Link>
            </span>
        </div>
    );
}
