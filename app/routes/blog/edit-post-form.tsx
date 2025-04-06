import * as stylex from "@stylexjs/stylex";
import {
  Button,
  FieldError,
  Input,
  Label,
  Text,
  TextField,
} from "react-aria-components";
import { Form } from "react-router";
import { color, space, textSize } from "~/lib/stylex/tokens.stylex";

type Props = {
  defaultValues?: {
    title?: string;
    content?: string;
  };
  errors?: {
    title?: string;
    content?: string;
  };
};
export const EditPostForm = ({ defaultValues, errors }: Props) => {
  return (
    <Form method="post">
      <div {...stylex.props(styles.root)}>
        <TextField
          {...stylex.props(TextFieldStyles.textField)}
          name="title"
          type="text"
          isRequired
          isInvalid={!!errors?.title}
          defaultValue={defaultValues?.title}
        >
          <Label {...stylex.props(TextFieldStyles.label)}>title</Label>
          <Input {...stylex.props(TextFieldStyles.input)} />
          <Text
            {...stylex.props(TextFieldStyles.description)}
            slot="description"
          >
            required.
          </Text>
          <FieldError {...stylex.props(TextFieldStyles.fieldError)}>
            {errors?.title}
          </FieldError>
        </TextField>
        <TextField
          name="content"
          type="text"
          isInvalid={!!errors?.content}
          {...stylex.props(TextFieldStyles.textField)}
          defaultValue={defaultValues?.content}
        >
          <Label {...stylex.props(TextFieldStyles.label)}>content</Label>
          <Input {...stylex.props(TextFieldStyles.input)} />
          <FieldError {...stylex.props(TextFieldStyles.fieldError)}>
            {errors?.content}
          </FieldError>
        </TextField>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: space.md,
  },
});

const TextFieldStyles = stylex.create({
  textField: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {
    color: color.subText,
  },
  input: {
    color: color.mainText,
  },
  description: {
    color: color.subText,
    fontSize: textSize.sm,
  },
  fieldError: {
    color: color.error,
    fontSize: textSize.sm,
  },
});
