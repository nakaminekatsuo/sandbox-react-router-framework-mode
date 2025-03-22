import { Button } from "react-aria-components";
import { Form, href, useFetcher } from "react-router";

type Props = {
  slug: string;
};
export const DeletePostButton = ({ slug }: Props) => {
  return (
    <Form
      method="post"
      action={href("/blog/:slug/delete", { slug })}
      onSubmit={(e) => {
        const ok = confirm("ポストを削除しますか？");
        if (!ok) {
          e.preventDefault();
        }
      }}
    >
      <Button type="submit">[Delete]</Button>
    </Form>
  );
};
