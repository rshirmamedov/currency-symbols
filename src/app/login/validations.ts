import { LOGIN_INCORRECT_EMAIL, LOGIN_INCORRECT_PASSWORD } from "@/config";
import type { Validate } from "react-hook-form";
import { LoginFormFields, VerificationFormFields } from "./types";

export const validateEmail: Validate<LoginFormFields["email"], LoginFormFields> = (email) => {
    if (!email.trim()) {
        return "Email is required";
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g.test(email)) {
        return "Email is invalid";
    }

    if (email.toLowerCase() === LOGIN_INCORRECT_EMAIL) {
        return "Email is incorrect";
    }
};

export const validatePassword: Validate<LoginFormFields["password"], LoginFormFields> = (password) => {
    if (!password.trim()) {
        return "Password is required";
    }

    if (password === LOGIN_INCORRECT_PASSWORD) {
        return "Password is incorrect";
    }
};

export const validateVerificationCode: Validate<VerificationFormFields["code"], VerificationFormFields> = (code) => {
    if (!code.trim()) {
        return "Verification code is required";
    }

    if (!/^[0-9]{4}$/g.test(code)) {
        return "Verification code is invalid";
    }
};
