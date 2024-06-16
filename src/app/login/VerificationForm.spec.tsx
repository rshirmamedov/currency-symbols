import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VerificationForm } from "./VerificationForm";

describe("VerificationForm", () => {
    it("renders required verification code error", async () => {
        render(<VerificationForm onBackToLogin={jest.fn()} onSubmit={jest.fn()} />);

        await userEvent.click(await screen.findByTestId("verify-button"));

        expect(await screen.findByTestId("code-field")).toMatchSnapshot();
    });

    it("renders invalid verification code error", async () => {
        const user = userEvent.setup();

        render(<VerificationForm onBackToLogin={jest.fn()} onSubmit={jest.fn()} />);

        const codeInput = screen.getByLabelText(/code/i);

        await user.type(codeInput, "12");

        await userEvent.click(await screen.findByTestId("verify-button"));

        expect(await screen.findByTestId("code-field")).toMatchSnapshot();
    });

    it("disables verify button while submitting", async () => {
        const user = userEvent.setup();

        render(<VerificationForm onBackToLogin={jest.fn()} onSubmit={jest.fn()} />);

        const codeInput = screen.getByLabelText(/code/i);

        await user.type(codeInput, "1234");

        await userEvent.click(await screen.findByTestId("verify-button"));

        expect(await screen.findByTestId("verify-button")).toMatchSnapshot();
    });
});
