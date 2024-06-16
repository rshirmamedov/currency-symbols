import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";
import { LOGIN_INCORRECT_EMAIL, LOGIN_INCORRECT_PASSWORD } from "@/config";

describe("LoginForm", () => {
    it("renders required email and password errors", async () => {
        render(<LoginForm />);

        await userEvent.click(await screen.findByTestId("login-button"));

        expect(await screen.findByTestId('email-field')).toMatchSnapshot();
        expect(await screen.findByTestId('password-field')).toMatchSnapshot();
    });

    it("renders invalid email error", async () => {
        const user = userEvent.setup();

        render(<LoginForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await user.type(emailInput, 'john');
        await user.type(passwordInput, 'password');

        await userEvent.click(await screen.findByTestId("login-button"));

        expect(await screen.findByTestId('email-field')).toMatchSnapshot();
    });

    it("renders incorrect email error", async () => {
        const user = userEvent.setup();

        render(<LoginForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await user.type(emailInput, LOGIN_INCORRECT_EMAIL);
        await user.type(passwordInput, 'password');

        await userEvent.click(await screen.findByTestId("login-button"));

        expect(await screen.findByTestId('email-field')).toMatchSnapshot();
    });

    it("renders incorrect password error", async () => {
        const user = userEvent.setup();

        render(<LoginForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await user.type(emailInput, 'john@doe.com');
        await user.type(passwordInput, LOGIN_INCORRECT_PASSWORD);

        await userEvent.click(await screen.findByTestId("login-button"));

        expect(await screen.findByTestId('password-field')).toMatchSnapshot();
    });

    it("disables login button while submitting", async () => {
        const user = userEvent.setup();

        render(<LoginForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await user.type(emailInput, 'john@doe.com');
        await user.type(passwordInput, "test123");

        await userEvent.click(await screen.findByTestId("login-button"));

        expect(await screen.findByTestId('login-button')).toMatchSnapshot();
    });

});