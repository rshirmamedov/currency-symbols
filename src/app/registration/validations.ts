import type { Validate } from "react-hook-form";

export const validateEmail: Validate<RegistrationFormFields["email"], RegistrationFormFields> = (email) => {
    if (!email.trim()) {
        return "Email is required";
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g.test(email)) {
        return "Email is invalid";
    }
};

export const validatePassword: Validate<RegistrationFormFields["password"], RegistrationFormFields> = (password) => {
    if (!password.trim()) {
        return "Password is required";
    }
};

export const validateConfirmPassword: Validate<RegistrationFormFields["confirmPassword"], RegistrationFormFields> = (
    confirmPassword,
    { password },
) => {
    if (!confirmPassword.trim()) {
        return "Confirm password is required";
    }

    if (confirmPassword !== password) {
        return "Passwords do not match";
    }
};
