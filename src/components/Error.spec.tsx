import { render } from "@testing-library/react";
import { Error } from "./Error";

describe("Error", () => {
    it("renders with default message", () => {
        const { container } = render(<Error />);

        expect(container).toMatchSnapshot();
    });

    it("renders with custom message", () => {
        const { container } = render(<Error message="Username is required" />);

        expect(container).toMatchSnapshot();
    });
});