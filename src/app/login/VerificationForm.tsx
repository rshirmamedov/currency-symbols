"use client";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { sleep } from "@/utils";
import { TIMEOUT } from "@/config";
import { validateVerificationCode } from "./validations";
import { useCallback } from "react";

type VerificationFieldValues = {
    code: string;
};

type VerificationFormProps = {
    onBackToLogin: () => void;
    onSubmit: () => void;
};

export const VerificationForm = (props: VerificationFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<VerificationFieldValues>();

    const onSubmit = useCallback(async () => {
        await sleep(TIMEOUT);
        props.onSubmit();
    }, [props]);

    return (
        <div className="max-w-md w-full p-8 border border-gray-300 rounded-md bg-white">
            <h1 className="text-center text-2xl">Verification code</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field
                        inputId="code"
                        type="number"
                        label="Verification code (4 digits)"
                        placeholder="Enter 4-digit verification code"
                        disabled={isSubmitting}
                        error={errors.code?.message}
                        {...register("code", { validate: validateVerificationCode })}
                    />
                    <Button
                        data-testid="verify-button"
                        title={isSubmitting ? "Verifying..." : "Verify"}
                        disabled={isSubmitting}
                    />
                </form>
            </div>
            <div className="text-center p-4 text-sm border">
                <span className="text-blue-600 hover:underline pr-8">
                    <Link href="" onClick={props.onBackToLogin}>
                        Back to login
                    </Link>
                </span>
                <span className="text-blue-600 hover:underline">
                    <Link href="/registration">Register</Link>
                </span>
            </div>
        </div>
    );
};
