import { Archive, CaretDown } from "@phosphor-icons/react";
import { Button, Col, Dropdown, Row, Skeleton, Space } from "antd";
import { MenuProps } from "antd/es/menu";
import React, { useEffect } from "react";
import coursera from "../../../assets/icons/coursera-svgrepo-com.svg";
import edx from "../../../assets/icons/edx-svgrepo-com.svg";
import MainLayout from "../../../ui/layouts/MainLayout";
import {
  useExternalCourseStore,
  useUserStore,
} from "../../../utils/zustand/Store";
import ExternalCourseCard from "./elements/ExternalCourseCard";
import { X } from "phosphor-react";
const items: MenuProps["items"] = [
  {
    key: "1",
    className: "flex items-center",
    icon: <img loading="lazy" src={edx} alt="edx" className="w-6 h-6" />,
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        edX
      </a>
    ),
  },
  {
    key: "2",
    className: "flex items-center",
    icon: (
      <img loading="lazy" src={coursera} alt="coursera" className="w-6 h-6" />
    ),
    disabled: true,
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Coursera
      </a>
    ),
  },
];
const ExternalCourses: React.FC = () => {
  const { getKeyword, user } = useUserStore();
  const keyword = user && getKeyword ? getKeyword(user) : "";
  const { fetchCourseraCourses, coursera, loading } = useExternalCourseStore();
  useEffect(() => {
    return () => {
      fetchCourseraCourses(keyword);
    };
  }, []);
  return (
    <MainLayout>
      <div className="px-4 py-2 shadow-lg border border-[#d9d9d9] bg-white min-h-screen">
        <Row gutter={[6, 16]}>
          <Col className="" span={6}>
            dat
          </Col>
          <Col span={18}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Archive size={22} />
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <h1 className="text-[1rem] italic play-fair">Coursera</h1>
                      <CaretDown />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <Button type="dashed" className="flex items-center">
                <span>Ghé thăm</span>
                <span className="italic play-fair">Coursera</span>
              </Button>
            </div>
            <div className="flex items-center gap-2 my-4">
              <p>Dành cho ngành học :</p>
              <Button
                icon={<X />}
                iconPosition="end"
                className="border-[#8495b0] rounded-2xl px-4 py-1"
              >
                IT
              </Button>
              <a href="" className="underline">
                Xoá tất cả
              </a>
            </div>
            <ul>
              <Skeleton loading={loading} active>
                <Row gutter={[16, 16]}>
                  {!!coursera?.length &&
                    coursera?.map((course, index) => (
                      <ExternalCourseCard key={index} props={course} />
                    ))}
                </Row>
              </Skeleton>
            </ul>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ExternalCourses;
