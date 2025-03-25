import {
  BookBookmark,
  Funnel,
  GraduationCap,
  Tag,
  Clock,
  Star,
  CaretDown,
} from "@phosphor-icons/react";
import {
  Button,
  Divider,
  Select,
  Slider,
  Collapse,
  Rate,
  Checkbox,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";

const { Panel } = Collapse;
const { Title } = Typography;

interface ExternalCourseSidebarProps {
  onFilterChange?: (filters: any) => void;
}

const ExternalCourseSidebar: React.FC<ExternalCourseSidebarProps> = ({
  onFilterChange,
}) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const categories = [
    "Programming",
    "Web Development",
    "Data Science",
    "AI & Machine Learning",
    "Business",
    "Design",
  ];

  const levels = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const handleFilterChange = () => {
    onFilterChange?.({
      priceRange,
      categories: selectedCategories,
      level: selectedLevel,
      rating: selectedRating,
    });
  };

  return (
    <div className="fixed p-4 space-y-4 overflow-scroll bg-white rounded-lg shadow-md bottom-10 top-30 max-h-[500px]">
      <div className="flex items-center justify-between">
        <Title level={4} className="!mb-0">
          Filters
        </Title>
        <Funnel size={24} />
      </div>

      <Divider className="my-4" />

      <Collapse
        defaultActiveKey={["1", "2", "3", "4"]}
        expandIcon={({ isActive }) => (
          <CaretDown
            size={16}
            className={`transform transition-transform ${
              isActive ? "rotate-180" : ""
            }`}
          />
        )}
        ghost
      >
        <Panel
          header={
            <div className="flex items-center gap-2">
              <Tag size={20} />
              <span>Categories</span>
            </div>
          }
          key="1"
        >
          <Space direction="vertical" className="w-full">
            {categories.map((category) => (
              <Checkbox
                key={category}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...selectedCategories, category]
                    : selectedCategories.filter((c) => c !== category);
                  setSelectedCategories(newCategories);
                  handleFilterChange();
                }}
              >
                {category}
              </Checkbox>
            ))}
          </Space>
        </Panel>

        <Panel
          header={
            <div className="flex items-center gap-2">
              <GraduationCap size={20} />
              <span>Level</span>
            </div>
          }
          key="2"
        >
          <Select
            className="w-full"
            placeholder="Select level"
            value={selectedLevel}
            onChange={(value) => {
              setSelectedLevel(value);
              handleFilterChange();
            }}
            options={levels}
          />
        </Panel>

        <Panel
          header={
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>Duration</span>
            </div>
          }
          key="3"
        >
          <Slider
            range
            defaultValue={[0, 100]}
            onChange={(value: number[]) => {
              setPriceRange(value);
              handleFilterChange();
            }}
            marks={{
              0: "0h",
              25: "25h",
              50: "50h",
              75: "75h",
              100: "100h+",
            }}
          />
        </Panel>

        <Panel
          header={
            <div className="flex items-center gap-2">
              <Star size={20} />
              <span>Rating</span>
            </div>
          }
          key="4"
        >
          <Rate
            allowHalf
            value={selectedRating}
            onChange={(value) => {
              setSelectedRating(value);
              handleFilterChange();
            }}
          />
          <div className="mt-2 text-sm text-gray-500">
            {selectedRating ? `${selectedRating} stars & up` : "Any rating"}
          </div>
        </Panel>
      </Collapse>

      <Divider className="my-4" />

      <Button type="primary" block onClick={handleFilterChange}>
        Apply Filters
      </Button>

      <Button
        type="text"
        block
        onClick={() => {
          setPriceRange([0, 100]);
          setSelectedCategories([]);
          setSelectedLevel("all");
          setSelectedRating(0);
          handleFilterChange();
        }}
      >
        Clear All
      </Button>
    </div>
  );
};

export default ExternalCourseSidebar;
