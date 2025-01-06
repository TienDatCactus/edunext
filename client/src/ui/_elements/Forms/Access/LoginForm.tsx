import {
  Button,
  Form,
  FormProps,
  Input,
  Select,
  Spin,
  Switch,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { login } from "../../../../utils/api";
import { useNavigate } from "react-router-dom";
import { getCurrentSeason } from "../../../../utils/customHooks";
const { Password } = Input;
const { Option } = Select;

type FieldType = {
  campus: string;
  email: string;
  password: string;
};
const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const year = new Date().getFullYear().toString();
  const month = getCurrentSeason();
  const onFinish: FormProps<FieldType>["onFinish"] = async (props) => {
    const { campus, email, password } = props;
    try {
      setLoading(true);
      const loginAttempt = await login(campus, email, password);
      if (loginAttempt?.isOk === true) {
        message.success(loginAttempt?.message);
        setTimeout(() => {
          navigate(`/home/${year}/${month}`);
        }, 1000);
      } else {
        message.error(loginAttempt?.error);
      }
      return null;
    } catch (error) {
      message.error("Đã xảy ra lỗi, vui lòng thử lại sau !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Spin spinning={loading}>
        <Form
          className="flex flex-col gap-2 [&_.ant-form-item-explain-error]:mt-2"
          requiredMark={false}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Cơ sở"
            name="campus"
            className="[&_label]:text-[14px] m-0 [&_label]:font-semibold"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn cơ sở học tập của sinh viên !",
              },
            ]}
            layout="vertical"
          >
            <Select
              placeholder="Chọn cơ sở"
              className="[&_.ant-select-selector]:py-5 flex items-center font-light"
            >
              <Option value="1">Đà Nẵng</Option>
              <Option value="2">Hòa Lạc</Option>
              <Option value="3">Quy Nhơn</Option>
              <Option value="4">Cần Thơ</Option>
              <Option value="5">Hồ Chí Minh</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            className="[&_label]:text-[14px] m-0 [&_label]:font-semibold"
            rules={[
              {
                type: "email",
                required: true,
                message: "Vui lòng nhập email đúng định dạng !",
              },
            ]}
            layout="vertical"
          >
            <Input placeholder="Email" className="py-2 font-light" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            className="[&_label]:text-[14px] m-0 [&_label]:font-semibold"
            rules={[
              {
                type: "string",
                required: true,
                message: "Vui lòng nhập mật khẩu !",
              },
            ]}
            layout="vertical"
          >
            <Password placeholder="Mật khẩu" className="py-2 font-light" />
          </Form.Item>
          <Form.Item layout="vertical" valuePropName="checked" className="m-0">
            <div className="flex items-center gap-2">
              <Switch />
              <span className="text-[14px]">Ghi nhớ tài khoản</span>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              className="py-5 rounded-xl"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default LoginForm;
