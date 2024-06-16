"use client";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { validateEmail, validatePassword } from "./validations";
import { sleep } from "@/utils";
import { TIMEOUT } from "@/config";
import type { LoginFormFields } from './types';

type LoginFormProps = {
    onSubmit?: () => void;
};

export const LoginForm = (props: LoginFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormFields>();

    const onSubmit = async () => {
        await sleep(TIMEOUT);
        props.onSubmit?.();
    };

    return (
        <div data-testid="login-form" className="max-w-md w-full p-8 border border-gray-300 rounded-md bg-white">
            <h1 className="text-center text-2xl">Login</h1>
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
                    <Button
                        data-testid="login-button"
                        title={isSubmitting ? "Logging in..." : "Login"}
                        disabled={isSubmitting}
                    />
                </form>
            </div>
            <div className="text-center p-4 text-sm ">
                <span className="text-blue-600 hover:underline">
                    <Link href="/registration">Register</Link>
                </span>
            </div>
        </div>
    );
};
