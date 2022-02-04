import { FC, ReactChild } from "react";
import { Form } from "react-bulma-components";

interface Props {
  label: string;
  children: ReactChild;
  error?: string | null;
}

export const Field: FC<Props> = ({ label, children, error }: Props) => {
  return (
    <Form.Field mb={5}>
      <Form.Label>{label}</Form.Label>

      <Form.Field.Body className="is-justify-content-center	">{children}</Form.Field.Body>
      {error && (
        <Form.Help color="danger" data-testid="validation-error">
          {error}
        </Form.Help>
      )}
    </Form.Field>
  );
};
