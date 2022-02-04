import { render } from "@testing-library/react";
import { Field } from "../MainPage/LandingScreen/Field";
const children = <div>content</div>;
describe("Field Component", () => {
  test("display a field with an error", async () => {
    const component = render(
      <Field label="label" error="some error message">
        {children}
      </Field>
    );
    const error = await component.findByTestId("validation-error");
    expect(error).toHaveClass("is-danger");
    expect(error.textContent).toBe("some error message");
  });
  test("display a field without an error", async () => {
    const component = render(<Field label="label">{children}</Field>);

    const error = component.queryByTestId("validation-error");
    expect(error).not.toBeInTheDocument();
  });
});
