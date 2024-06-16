"use client";

import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { validateConfirmPassword, validateEmail, validatePassword } from "./validations";
import { sleep } from "@/utils";
import { TIMEOUT } from "@/config";
import { useCallback } from "react";

type RegistrationFormProps = {
    onSubmit: () => void;
};

export const RegistrationForm = (props: RegistrationFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegistrationFormFields>();

    const onSubmit = useCallback(async () => {
        await sleep(TIMEOUT);
        props.onSubmit();
    }, [props]);

    return (
        <div data-testid="registration-form" className="max-w-md w-full p-8 border border-gray-300 rounded-md bg-white">
            <h1 className="text-center text-2xl">Registration</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field
                        inputId="email"
                        type="text"
                        label="Email"
                        placeholder="Enter email"
                        disabled={isSubmitting}
                        error={errors.email?.message}
                        {...register("email", { validate: validateEmail })}
                    />
                    <Field
                        inputId="password"
                        type="password"
                        label="Password"
                        placeholder="Enter password"
                        disabled={isSubmitting}
                        error={errors.password?.message}
                        {...register("password", { validate: validatePassword })}
                    />
                    <Field
                        inputId="confirm-password"
                        type="password"
                        label="Confirm Password"
                        placeholder="Enter confirm password"
                        disabled={isSubmitting}
                        error={errors.confirmPassword?.message}
                        {...register("confirmPassword", { validate: validateConfirmPassword })}
                    />
                    <Button
                        data-testid="register-button"
                        title={isSubmitting ? "Registering..." : "Register"}
                        disabled={isSubmitting}
                    />
                </form>
            </div>
            <div className="text-center p-4 text-sm text-blue-600 hover:text-blue-500">
                <Link href="/login">Login</Link>
            </div>
        </div>
    );
};
