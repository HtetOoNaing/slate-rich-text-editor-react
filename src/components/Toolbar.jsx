import { useEffect, useState } from "react";
import { useSlate } from "slate-react";
import {
  toggleBlock,
  toggleMark,
  isMarkActive,
  addMarkData,
  isBlockActive,
  activeMark,
  useTable,
  toolbarGroups as defaultToolbarGroups,
} from "../utils";
import {
  Embed,
  LinkButton,
  ColorPicker,
  Icon,
  Button,
  Table,
  InTable,
} from ".";

const Toolbar = () => {
  const editor = useSlate();
  const isTable = useTable(editor);
  const [toolbarGroups, setToolbarGroups] = useState(defaultToolbarGroups);
  useEffect(() => {
    let filteredGroups = [...defaultToolbarGroups];
    if (isTable) {
      filteredGroups = toolbarGroups.map((grp) =>
        grp.filter((element) => element.type !== "block")
      );
      filteredGroups = filteredGroups.filter((elem) => elem.length);
    }
    setToolbarGroups(filteredGroups);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTable]);
  const BlockButton = ({ format }) => {
    return (
      <Button
        active={isBlockActive(editor, format)}
        format={format}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, format);
        }}
      >
        <Icon icon={format} />
      </Button>
    );
  };
  const MarkButton = ({ format }) => {
    return (
      <Button
        active={isMarkActive(editor, format)}
        format={format}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, format);
        }}
      >
        <Icon icon={format} />
      </Button>
    );
  };
  const Dropdown = ({ format, options }) => {
    return (
      <select
        value={activeMark(editor, format)}
        onChange={(e) => changeMarkData(e, format)}
      >
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    );
  };
  const changeMarkData = (event, format) => {
    event.preventDefault();
    const value = event.target.value;
    addMarkData(editor, { format, value });
  };

  return (
    <div className="toolbar">
      {toolbarGroups.map((group, index) => (
        <span key={index} className="toolbar-grp">
          {group.map((element) => {
            switch (element.type) {
              case "block":
                return <BlockButton key={element.id} {...element} />;
              case "mark":
                return <MarkButton key={element.id} {...element} />;
              case "dropdown":
                return <Dropdown key={element.id} {...element} />;
              case "link":
                return (
                  <LinkButton
                    key={element.id}
                    active={isBlockActive(editor, "link")}
                    editor={editor}
                  />
                );
              case "embed":
                return (
                  <Embed
                    key={element.id}
                    format={element.format}
                    editor={editor}
                  />
                );
              case "color-picker":
                return (
                  <ColorPicker
                    key={element.id}
                    activeMark={activeMark}
                    format={element.format}
                    editor={editor}
                  />
                );
              case "table":
                return <Table key={element.id} editor={editor} />;
              case "inTable":
                return isTable ? (
                  <InTable key={element.id} editor={editor} />
                ) : null;
              default:
                return <button>Invalid Button</button>;
            }
          })}
        </span>
      ))}
    </div>
  );
};

export default Toolbar;
