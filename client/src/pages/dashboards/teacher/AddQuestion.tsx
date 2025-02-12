import { Button } from "antd";
import DashboardLayout from "../../../ui/layouts/DashboardLayout";
import { Plus } from "@phosphor-icons/react";
import { useState } from "react";
import AddForm from "../../../ui/_elements/Forms/Dashboard/Teacher/AddForm";

function AddQuestion() {
  const [questions, setQuestions] = useState([1]);

  const addQuestion = () => {
    setQuestions([...questions, questions.length + 1]);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {questions.map((questionIndex) => (
          <AddForm key={questionIndex} questionIndex={questionIndex} />
        ))}
        <Button
          type="dashed"
          icon={<Plus size={16} />}
          className="w-[100%] mt-4 border-dashed"
          onClick={addQuestion}
        >
          Add Question
        </Button>
      </div>
    </DashboardLayout>
  );
}

export default AddQuestion;
