import { Main } from "~/domain/layout/main";
import type { Route } from "./+types/_index";
import { Form, href, Link, redirect } from "react-router";
import {
  Button,
  FieldError,
  Input,
  Label,
  Text,
  TextField,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";
import { color, space, textSize } from "~/lib/stylex/tokens.stylex";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Create Post | Blog` },
    { name: "description", content: "create post." },
  ];
}

export default function Page({
  loaderData,
  params,
  actionData,
}: Route.ComponentProps) {
  return (
    <Main>
      <h2 {...stylex.props(styles.title)}>Create Post</h2>
      <Link to={href("/blog")}>back</Link>
      <div {...stylex.props(styles.line)} />
      <Form method="post">
        <div {...stylex.props(styles.root)}>
          <TextField
            {...stylex.props(TextFieldStyles.textField)}
            name="title"
            type="text"
            isRequired
          >
            <Label {...stylex.props(TextFieldStyles.label)}>title</Label>
            <Input {...stylex.props(TextFieldStyles.input)} />
            <Text
              {...stylex.props(TextFieldStyles.description)}
              slot="description"
            >
              required.
            </Text>
            <FieldError {...stylex.props(TextFieldStyles.fieldError)} />
          </TextField>
          <TextField
            name="content"
            type="text"
            {...stylex.props(TextFieldStyles.textField)}
          >
            <Label {...stylex.props(TextFieldStyles.label)}>content</Label>
            <Input {...stylex.props(TextFieldStyles.input)} />
          </TextField>
          <Button type="submit">Submit</Button>
        </div>
      </Form>
      <div>
        {actionData?.data && (
          <pre>{JSON.stringify(actionData.data, null, 2)}</pre>
        )}
      </div>
    </Main>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: space.md,
  },
  title: {
    margin: 0,
  },
  line: {
    height: 1,
    backgroundColor: color.line,
  },
});

const TextFieldStyles = stylex.create({
  textField: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  label: {},
  input: {},
  description: {
    color: color.subText,
    fontSize: textSize.sm,
  },
  fieldError: {
    color: color.error,
    fontSize: textSize.sm,
  },
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = String(formData.get("title"));
  const content = String(formData.get("content"));
  console.log(title);
  console.log(content);

  let errors = undefined;
  if (errors) {
    return { data: { title, content }, errors };
  }
  return redirect(href("/blog"));
}
