"use client";

import { useRouter } from "next/navigation";
import { RegistrationForm } from "./RegistrationForm";
import { useCallback } from "react";

export default function Registration() {
    const router = useRouter();
    const handleSubmit = useCallback(() => {
        router.push("/account");
    }, [router]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <RegistrationForm onSubmit={handleSubmit} />
        </div>
    );
}
