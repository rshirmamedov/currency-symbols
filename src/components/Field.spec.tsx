import { render } from "@testing-library/react";
import { Field } from "./Field";

describe("Field", () => {
    it("renders", () => {
        const { container } = render(<Field label="username" />);

        expect(container).toMatchSnapshot();
    });

    it("renders with error", () => {
        const { container } = render(<Field label="username" error="Username is required" />);

        expect(container).toMatchSnapshot();
    });
});
