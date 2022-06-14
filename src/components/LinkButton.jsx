import { insertLink, isBlockActive } from "../utils";
import { Icon, Button } from ".";

const LinkButton = (props) => {
  const { editor } = props;
  const handleInsertLink = () => {
    const url = prompt("Enter URL");
    insertLink(editor, url);
  };
  return (
    <Button
      active={isBlockActive(editor, "link")}
      format={"link"}
      onClick={handleInsertLink}
    >
      <Icon icon="link" />
    </Button>
  );
};

export default LinkButton;
