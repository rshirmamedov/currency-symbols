import { validateConfirmPassword, validateEmail, validatePassword } from "./validations";

const registrationFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
};

describe("registration/validations", () => {
    describe("validateEmail", () => {
        it("returns required email error", () => {
            expect(validateEmail("", registrationFormValues)).toBe("Email is required");
            expect(validateEmail("   ", registrationFormValues)).toBe("Email is required");
        });

        it("returns invalid email error", () => {
            expect(validateEmail("test", registrationFormValues)).toBe("Email is invalid");
        });

        it("returns no error", () => {
            expect(validateEmail("john@doe.com", registrationFormValues)).toBeUndefined();
            expect(validateEmail("John@Doe.com", registrationFormValues)).toBeUndefined();
        });
    });

    describe("validatePassword", () => {
        it("returns required password error", () => {
            expect(validatePassword("", registrationFormValues)).toBe("Password is required");
            expect(validatePassword("   ", registrationFormValues)).toBe("Password is required");
        });

        it("returns no error", () => {
            expect(validatePassword("test123", registrationFormValues)).toBeUndefined();
        });
    });

    describe("validateConfirmPassword", () => {
        it("returns required confirm password error", () => {
            expect(validateConfirmPassword("", registrationFormValues)).toBe("Confirm password is required");
            expect(validateConfirmPassword("   ", registrationFormValues)).toBe("Confirm password is required");
        });

        it("returns passwords match error", () => {
            expect(validateConfirmPassword("test123", registrationFormValues)).toBe("Passwords do not match");
        });

        it("returns no error", () => {
            expect(
                validatePassword("test123", {
                    ...registrationFormValues,
                    password: "test123",
                }),
            ).toBeUndefined();
        });
    });
});
