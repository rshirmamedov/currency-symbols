"use client";

import { useCallback, useState } from "react";
import { LoginForm } from "./LoginForm";
import { useRouter } from "next/navigation";
import { VerificationForm } from "./VerificationForm";

type LoginStep = "auth" | "verify";

export default function Login() {
    const [step, setStep] = useState<LoginStep>("auth");
    const router = useRouter();

    const handleLoginSubmit = useCallback(() => {
        setStep("verify");
    }, []);

    const handleVerificationSubmit = useCallback(() => {
        router.push("/account");
    }, [router]);

    const openLogin = useCallback(() => {
        setStep("auth");
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            {step === "auth" ? (
                <LoginForm onSubmit={handleLoginSubmit} />
            ) : (
                <VerificationForm onSubmit={handleVerificationSubmit} onBackToLogin={openLogin} />
            )}
        </div>
    );
}
