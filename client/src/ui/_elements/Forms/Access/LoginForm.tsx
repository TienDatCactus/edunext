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
import { useNavigate } from "react-router-dom";
import { getCampuses, login } from "../../../../utils/api";
import { getCurrentSeason } from "../../../../utils/customHooks";
import { useUserStore } from "../../../../utils/zustand/Store";
const { Password } = Input;
const { Option } = Select;

interface Campus {
  campusName: string;
  createdAt: string;
  id: string;
  updatedAt: string;
  users: Array<any>;
  __v: number;
  _id: string;
}
export type FieldType = {
  campus: string;
  email: string;
  password: string;
};
const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const year = new Date().getFullYear().toString();
  const month = getCurrentSeason();
  const { setUser } = useUserStore();

  const loginCampuses = async () => {
    try {
      setLoading(true);
      const data = await getCampuses();
      if (data?.isOk === true) {
        setCampuses(data?.campuses);
      }
    } catch (error) {
      message.error("Gặp lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (props) => {
    const { campus, email, password } = props;
    try {
      setLoading(true);
      const resp = await login(campus, email, password);
      if (resp?.isOk === true) {
        setUser(resp?.user?.user);
        message.success(resp?.message);
        if (resp?.user?.user?.role === 1 || resp?.user?.user?.role === 2) {
          navigate(`/home/${year}/${month}`, { replace: true });
        } else {
          navigate(`/admin/course`, {
            replace: true,
          });
        }
      } else {
        message.error(resp?.error);
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi, vui lòng thử lại sau !");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loginCampuses();
  }, []);
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
              {!!campuses?.length &&
                campuses?.map((campus, index) => (
                  <Option key={index} value={campus?._id}>
                    {campus?.campusName}
                  </Option>
                ))}
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
