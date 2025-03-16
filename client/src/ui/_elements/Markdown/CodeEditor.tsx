import { Code, Dot, PaperPlaneTilt, Play } from "@phosphor-icons/react";
import { Button, Divider, message, Spin } from "antd";
import { useState } from "react";
import Markdown from "react-markdown";
import Editor, { EditorConstructionOptions } from "react-monaco-editor";
import { executeCode } from "../../../utils/api/externals";
import { useLocation } from "react-router-dom";
import { submitCode } from "../../../utils/api";
import { c } from "framer-motion/dist/types.d-6pKw1mTI";
import { useCodeStore } from "../../../utils/zustand/Store";

interface CodeEditorProps {
  qId?: string;
  lId?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ qId }) => {
  const {
    handleEditorChange,
    runCode,
    lineCount,
    code,
    codeloading,
    output,
    handleSubmitCode,
  } = useCodeStore();
  return (
    <>
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
            <Button
              type="default"
              icon={<Play />}
              onClick={() => runCode(code || "")}
              loading={codeloading}
            >
              Test
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 ">
          <div className="col-span-6 ">
            <Editor
              height="300px"
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
              value={code}
            />
          </div>
          <div className="col-span-6">
            <Spin spinning={codeloading}>
              <Markdown>
                {` \`\`\`javascript
            ${output}
             `}
              </Markdown>
            </Spin>
          </div>
        </div>
      </div>
      <div className="flex justify-end my-2">
        <Button
          onClick={() => handleSubmitCode(code || "", qId || "")}
          icon={<PaperPlaneTilt size={18} />}
          type="primary"
        >
          Gửi
        </Button>
      </div>
    </>
  );
};

export default CodeEditor;
