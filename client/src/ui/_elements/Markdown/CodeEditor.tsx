import { Code, Dot, Play } from "@phosphor-icons/react";
import { Button } from "antd";
import { useState } from "react";
import Editor, { EditorConstructionOptions } from "react-monaco-editor";
export const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here");
  const [lineCount, setLineCount] = useState(1);
  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      const lines = value.split("\n").length;
      setLineCount(lines);
      setCode(value);
    } else {
      setLineCount(1);
    }
  };
  return (
    <div className="pb-2 border rounded-lg shadow-md">
      <div className="bg-[#f8f8f8] mb-2 border-b flex justify-between items-center">
        <div className="flex items-center p-2">
          <div className="p-2 bg-white rounded-lg shadow-md">
            <Code size={22} />
          </div>
          <p className="text-[16px] font-semibold p-2 ">Code Editor</p>
        </div>
        <div className="flex items-center gap-2 p-2">
          <div className="flex items-center font-medium">
            <p>Cập nhật vừa xong</p>
            <Dot size={22} />
            <p>{lineCount} dòng</p>
          </div>
          <Button type="default" icon={<Play />}>
            Test
          </Button>
        </div>
      </div>
      <Editor
        height="326px"
        language="javascript"
        onChange={handleEditorChange}
        options={
          {
            minimap: { enabled: true },
            automaticLayout: true,
            formatOnType: true,
            lineNumbers: "on",
            autoClosingBrackets: "always",
            "semanticHighlighting.enabled": true,
            theme: "vs",
            lightbulb: "on",
            acceptSuggestionOnEnter: "on",
          } as EditorConstructionOptions
        }
        defaultValue={code}
      />
    </div>
  );
};

export default CodeEditor;
