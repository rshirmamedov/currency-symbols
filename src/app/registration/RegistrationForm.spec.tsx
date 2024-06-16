import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegistrationForm } from "./RegistrationForm";

describe("RegistrationForm", () => {
    it("renders required email and passwords errors", async () => {
        render(<RegistrationForm onSubmit={jest.fn()} />);

        await userEvent.click(await screen.findByTestId("register-button"));

        expect(await screen.findByTestId('email-field')).toMatchSnapshot();
        expect(await screen.findByTestId('password-field')).toMatchSnapshot();
        expect(await screen.findByTestId('confirm-password-field')).toMatchSnapshot();
    });

    it("renders invalid email error", async () => {
        const user = userEvent.setup();

        render(<RegistrationForm onSubmit={jest.fn()} />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/^password/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

        await user.type(emailInput, 'john');
        await user.type(passwordInput, 'password');
        await user.type(confirmPasswordInput, 'password');

        await userEvent.click(await screen.findByTestId("register-button"));

        expect(await screen.findByTestId('email-field')).toMatchSnapshot();
    });

    it("renders passwords match error", async () => {
        const user = userEvent.setup();

        render(<RegistrationForm onSubmit={jest.fn()} />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/^password/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

        await user.type(emailInput, "john@doe.com");
        await user.type(passwordInput, "password");
        await user.type(confirmPasswordInput, "Password");

        await userEvent.click(await screen.findByTestId("register-button"));

        expect(await screen.findByTestId('confirm-password-field')).toMatchSnapshot();
    });

    it("disables register button while submitting", async () => {
        const user = userEvent.setup();

        render(<RegistrationForm onSubmit={jest.fn()} />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/^password/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

        await user.type(emailInput, 'john@doe.com');
        await user.type(passwordInput, "test123");
        await user.type(confirmPasswordInput, "test123");

        await userEvent.click(await screen.findByTestId("register-button"));

        expect(await screen.findByTestId('register-button')).toMatchSnapshot();
    });

});