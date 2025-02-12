import {
  Circle,
  DotsSixVertical,
  DotsThreeOutline,
  Plus,
  Question,
  Timer,
  Trash,
} from "@phosphor-icons/react";
import {
  Button,
  Checkbox,
  Divider,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
} from "antd";
import { useState } from "react";

const { Option } = Select;
const { TextArea } = Input;



function AddForm({ questionIndex }: { questionIndex: number }) {
  const [content, setContent] = useState<string>("");
  const [type, setType] = useState("");


  const handleChange = (value: string) => {
   setType(type);
  };

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const [answers, setAnswers] = useState<string[]>([
    "User Integration",
    "User Interface",
    "Universal Interaction",
    "User Involvement",
  ]);

  // Updated the state type to allow string[], string or null
  const [selectedAnswer, setSelectedAnswer] = useState<
    string | string[] | null
  >(answers[1]);

  const [isMultipleAnswers, setIsMultipleAnswers] = useState(false);

  const addAnswer = (): void => {
    setAnswers([...answers, `New Answer ${answers.length + 1}`]);
  };

  const deleteAnswer = (index: number): void => {
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswers(newAnswers);
    if (
      Array.isArray(selectedAnswer) &&
      selectedAnswer.includes(answers[index])
    ) {
      setSelectedAnswer(
        selectedAnswer.filter((item) => item !== answers[index])
      );
    } else if (selectedAnswer === answers[index]) {
      setSelectedAnswer(null);
    }
  };

  const updateAnswer = (index: number, newAnswer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = newAnswer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const answersObject = answers.reduce<string[]>((acc, answer) => {
      acc.push(answer);
      return acc;
    }, []);

    let correctAnswer;

    if (isMultipleAnswers) {
      correctAnswer = answers
        .map((value, index) => (selectedAnswer?.includes(value) ? index : -1))
        .filter((index) => index !== -1);
    } else {
      correctAnswer = answers
        .map((value, index) => (value === selectedAnswer ? index : -1))
        .filter((index) => index !== -1);
    }
    const question = {
      content: [
        {
          title: content,
          answers: answersObject,
          correctAnswer: correctAnswer,
        },
      ],
      status: false,
      lesson: "",
      type: type
    };

    console.log(question);
    
  

  };

  return (
    <div className="min-h-[550px] w-90%] border-[2px] rounded-[5px] p-[20px]">
      <div className="flex justify-between items-center">
        <Select
          defaultValue="quiz"
          onChange={handleChange}
          className="[&_.ant-select-selector]:border-[0px] [&_.ant-select-selector]:bg-[#f6f6f6]"
          options={[
            { value: "quiz", label: "Multiple choice" },
            { value: "response", label: "Essay questions" },
          ]}
        />

        <div className="flex justify-between items-center">
          <div>
            <span>
              <strong>Required</strong>
            </span>
            <Switch defaultChecked onChange={onChange} className="mx-[10px]" />
          </div>
          <button className="border-[2px] rounded-[5px] p-[5px] ml-[20px]">
            <DotsThreeOutline size={32} />
          </button>
        </div>
      </div>

      <Divider style={{ borderWidth: 1 }} />

      <form onSubmit={handleSubmit}>
        <div>
          <div className="flex items-center mb-[20px]">
            <Question size={20} className="mr-[10px]" />
            <strong>
              Question {questionIndex} <span className="text-[red]">*</span>
            </strong>
          </div>

          <TextArea
            maxLength={100}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              height: 180,
              width: "70%",
              resize: "none",
              backgroundColor: "#f6f6f6",
              marginBottom: 20,
            }}
          />

          <div className="flex items-center">
            <div>
              Choices<span className="text-[red]">*</span>
            </div>
            <Divider
              type="vertical"
              style={{ borderWidth: 1, height: 20, margin: "0 20px" }}
            />
            <div>
              <span>Multiple answers</span>
              <Switch
                defaultChecked={isMultipleAnswers}
                onChange={(checked) => setIsMultipleAnswers(checked)}
                className="mx-[10px]"
              />
            </div>
          </div>

          <div className="my-[20px]">
            {isMultipleAnswers ? (
              <Checkbox.Group
                onChange={(checkedValues) => setSelectedAnswer(checkedValues)}
                value={Array.isArray(selectedAnswer) ? selectedAnswer : []}
                className="w-full space-y-2"
                style={{ display: "block" }}
              >
                {answers.map((answer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between  bg-gray-50 p-2 rounded-md shadow-sm"
                  >
                    <Checkbox value={answer} className="flex-1">
                      <Input
                        value={answer}
                        onChange={(e) => updateAnswer(index, e.target.value)}
                        className="w-full"
                      />
                    </Checkbox>
                    <div className="flex items-center space-x-2">
                      <DotsSixVertical
                        className="cursor-move text-gray-400"
                        size={20}
                      />
                      <Trash
                        className="text-red-500 cursor-pointer"
                        size={20}
                        onClick={() => deleteAnswer(index)}
                      />
                    </div>
                  </div>
                ))}
              </Checkbox.Group>
            ) : (
              <Radio.Group
                onChange={(e) => setSelectedAnswer(e.target.value)}
                value={selectedAnswer}
                className="w-full space-y-2"
              >
                {answers.map((answer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-md shadow-sm"
                  >
                    <Radio value={answer} className="flex-1">
                      <Input
                        value={answer}
                        onChange={(e) => updateAnswer(index, e.target.value)}
                        className="w-full"
                      />
                    </Radio>
                    <div className="flex items-center space-x-2">
                      <DotsSixVertical
                        className="cursor-move text-gray-400"
                        size={20}
                      />
                      <Trash
                        className="text-red-500 cursor-pointer"
                        size={20}
                        onClick={() => deleteAnswer(index)}
                      />
                    </div>
                  </div>
                ))}
              </Radio.Group>
            )}

            <Button
              type="dashed"
              onClick={addAnswer}
              icon={<Plus size={16} />}
              className="w-[200px] mt-4 border-dashed"
            >
              Add answers
            </Button>
          </div>

          <Divider style={{ borderWidth: 1 }} />

          <div className="flex gap-4 items-center">
            <div className="flex flex-col mr-[20px]">
              <label className="text-sm font-medium">Randomize Order</label>
              <Select
                defaultValue="Keep choices in current order"
                className="w-100"
              >
                <Option value="keep">Keep choices in current order</Option>
                <Option value="random">Randomize choices</Option>
              </Select>
            </div>

            <div className="flex flex-col mr-[20px]">
              <label className="text-sm font-medium">Estimation time</label>
              <div className="flex items-center border rounded-lg  gap-2 bg-gray-50">
                <InputNumber
                  min={0}
                  defaultValue={2}
                  className="w-16 border-none bg-transparent"
                />
                <span className="text-gray-500">Mins</span>
                <Timer size={20} className="text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Mark as point</label>
              <div className="flex items-center border rounded-lg  gap-2 bg-gray-50">
                <InputNumber
                  min={0}
                  defaultValue={1}
                  className="w-16 border-none bg-transparent"
                />
                <span className="text-gray-500">Points</span>
                <Circle size={20} weight="fill" className="text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
        <button>ADD</button>
      </form>
    </div>
  );
}

export default AddForm;
