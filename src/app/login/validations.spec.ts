import { LOGIN_INCORRECT_EMAIL, LOGIN_INCORRECT_PASSWORD } from "@/config";
import { validateEmail, validatePassword, validateVerificationCode } from "./validations";

const loginFormValues = {
    email: "",
    password: "",
};

const verificationFormValues = {
    code: "",
};

describe("login/validations", () => {
    describe("validateEmail", () => {
        it("returns required email error", () => {
            expect(validateEmail("", loginFormValues)).toBe("Email is required");
            expect(validateEmail("   ", loginFormValues)).toBe("Email is required");
        });

        it("returns invalid email error", () => {
            expect(validateEmail("test", loginFormValues)).toBe("Email is invalid");
        });

        it("returns incorrect email error", () => {
            expect(validateEmail(LOGIN_INCORRECT_EMAIL, loginFormValues)).toBe("Email is incorrect");
        });

        it("returns no error", () => {
            expect(validateEmail("john@doe.com", loginFormValues)).toBeUndefined();
            expect(validateEmail("John@Doe.com", loginFormValues)).toBeUndefined();
        });
    });

    describe("validatePassword", () => {
        it("returns required password error", () => {
            expect(validatePassword("", loginFormValues)).toBe("Password is required");
            expect(validatePassword("   ", loginFormValues)).toBe("Password is required");
        });

        it("returns incorrect password error", () => {
            expect(validatePassword(LOGIN_INCORRECT_PASSWORD, loginFormValues)).toBe("Password is incorrect");
        });

        it("returns no error", () => {
            expect(validatePassword("test123", loginFormValues)).toBeUndefined();
        });
    });

    describe("validateVerificationCode", () => {
        it("returns required verification code error", () => {
            expect(validateVerificationCode("", verificationFormValues)).toBe("Verification code is required");
            expect(validateVerificationCode("   ", verificationFormValues)).toBe("Verification code is required");
        });

        it("returns invalid verification code error", () => {
            expect(validateVerificationCode("12", verificationFormValues)).toBe("Verification code is invalid");
            expect(validateVerificationCode("abcd", verificationFormValues)).toBe("Verification code is invalid");
        });

        it("returns no error", () => {
            expect(validateVerificationCode("1234", verificationFormValues)).toBeUndefined();
        });
    });
});
