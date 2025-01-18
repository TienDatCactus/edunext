import { GoogleChromeLogo, MetaLogo, PlusCircle } from "@phosphor-icons/react";
import { Button, Divider, Form, Input } from "antd";
import Password from "antd/es/input/Password";
import { useEffect, useState } from "react";
import DashboardLayout from "../../../../ui/layouts/DashboardLayout";
import { User, UserToken } from "../../../../utils/interfaces";

const Account = () => {
  const [user, setUser] = useState<User>();
  const token = localStorage.getItem("edu-token");
  const userToken = token ? (JSON.parse(token) as UserToken) : null;
  useEffect(() => {
    return () => {
      if (userToken) {
        return setUser(userToken?.user);
      }
    };
  }, []);
  return (
    <DashboardLayout>
      <div className="flex flex-col justify-start py-2 leading-6">
        <h1 className="text-[18px] text-[#000] font-semibold">Tài khoản</h1>
        <p className="text-[14px] text-[#828282]">
          Thay đổi và cập nhật thông tin theo thời gian thực
        </p>
      </div>
      <Divider className="my-2 border-[#ddd] border" />
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <div>
            <img
              src="https://api.dicebear.com/9.x/notionists/svg?seed=Felix"
              alt="avatar"
              className="w-16 h-16 border rounded-full"
            />
          </div>
          <div className="leading-5">
            <h1 className="font-bold">Ảnh đại diện</h1>
            <p className="text-[14px] text-[#7d7d7d]">PNG, JPEG dưới 15mb</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="shadow-md">Thêm ảnh mới</Button>
          <Button className="shadow-none bg-[#dfdfdf] border-none">Xóa</Button>
        </div>
      </div>
      <Form
        className="grid items-end grid-cols-12 gap-2 [&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:text-[10px] [&_.ant-form-item-label>label]:text-[#676767] [&_.ant-form-item-label>label]:font-medium"
        layout="vertical"
      >
        <Form.Item className="col-span-5" label="Họ">
          <Input
            value={user?.name.split(" ")[1]}
            className="py-2 shadow-md dm-sans"
          />
        </Form.Item>
        <Form.Item label="Tên" className="col-span-5">
          <Input
            value={user?.name.split(" ")[0]}
            className="py-2 shadow-md dm-sans"
          />
        </Form.Item>
        <Form.Item className="col-span-2 ">
          <Button block>Lưu</Button>
        </Form.Item>
      </Form>
      <Divider className="m-0 border-[#ccc]" />
      <div>
        <div className="py-2">
          <h1 className="text-[20px] font-bold">Địa chỉ Liên Lạc</h1>
          <p className="text-[14px] text-[#676767]">
            Quản lý tài khoản của bạn qua email
          </p>
        </div>
        <Form
          className="items-end justify-between [&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:text-[10px] [&_.ant-form-item-label>label]:text-[#676767] [&_.ant-form-item-label>label]:font-medium grid grid-cols-12 "
          layout="vertical"
        >
          <Form.Item label="Email" className="col-span-6">
            <Input className="py-2 shadow-md dm-sans" value={user?.email} />
          </Form.Item>
          <Form.Item className="col-span-6 text-end">
            <Button
              className="w-1/2 font-medium text-[14px] text-[#222222] shadow-md"
              icon={<PlusCircle size={18} />}
            >
              Thêm Email mới
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Divider className="m-0 border-[#ccc]" />
      <div>
        <div className="py-2">
          <h1 className="text-[20px] font-bold">Mật khẩu</h1>
          <p className="text-[14px] text-[#676767]">
            Thay đổi mật khẩu của bạn
          </p>
        </div>
        <Form
          className="items-end grid-cols-12 gap-2  [&_.ant-form-item-label]:p-0 [&_.ant-form-item-label>label]:text-[10px] [&_.ant-form-item-label>label]:text-[#676767] [&_.ant-form-item-label>label]:font-medium grid "
          layout="vertical"
        >
          <Form.Item label="Mật khẩu cũ" className="col-span-5">
            <Password
              className="py-2 shadow-md dm-sans"
              value={"Ấn thay đổi"}
            />
          </Form.Item>
          <Form.Item label="Mật khẩu mới" className="col-span-5">
            <Password
              className="py-2 shadow-md dm-sans"
              value={"để chuyển đến trang xác thực"}
            />
          </Form.Item>

          <Form.Item className="col-span-2 text-end">
            <Button className=" font-medium text-[14px] text-[#222222] shadow-md">
              Thay đổi
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Divider className="m-0 border-[#ccc]" />
      <div>
        <div className="py-2">
          <h1 className="text-[20px] font-bold">Liên kết tài khoản</h1>
          <p className="text-[14px] text-[#676767]">
            Quản lí tài khoản liên kết
          </p>
        </div>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center justify-between p-2 border rounded-md shadow-md">
            <div className="flex items-center gap-2">
              <div>
                <MetaLogo
                  size={22}
                  className="w-10 h-10 p-1 border rounded-md"
                />
              </div>
              <div>
                <h1 className="text-[16px]  font-bold">Google</h1>
                <p className="text-[14px] text-[#676767]">
                  Chuyển tiếp tới trang quản lí tài khoản
                </p>
              </div>
            </div>
            <div>
              <Button className="text-[#009762] text-[14px] border-[#009762] font-medium">
                Đã kết nối
              </Button>
            </div>
          </li>
          <li className="flex items-center justify-between p-2 border rounded-md shadow-md">
            <div className="flex items-center gap-2">
              <div>
                <GoogleChromeLogo
                  size={22}
                  className="w-10 h-10 p-1 border rounded-md"
                />
              </div>
              <div>
                <h1 className="text-[16px]  font-bold">Google</h1>
                <p className="text-[14px] text-[#676767]">
                  Chuyển tiếp tới trang quản lí tài khoản
                </p>
              </div>
            </div>
            <div>
              <Button className="text-[#009762] text-[14px] border-[#009762] font-medium">
                Đã kết nối
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default Account;
