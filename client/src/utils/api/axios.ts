import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorHandlerOptions } from "../interfaces";

// Create an Axios instance with default config
const http = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// const bodyParse = (resp: any) => {
//   const respData = resp.data;
//   console.log(resp?.status);
//   if (+resp?.status >= 500) {
//     return message.error(
//       `Hệ thống đang tạm thời gián đoạn. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ`
//     );
//   }
//   if (+resp?.status < 500 && +resp?.status !== 200) {
//     return message.error(
//       "Hệ thống xảy ra lỗi. Xin vui lòng trở lại sau hoặc thông báo với ban quản trị để được hỗ trợ "
//     );
//   }
//   if (respData?.statusCode === 401) {
//     localStorage.removeItem("edu-token");
//     return window.location.replace("/auth/login");
//   }
//   return resp;
// };

const createErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const {
    redirectOnUnauthorized = true,
    loginRedirectPath = "/auth/login",
    defaultSystemErrorMessage = "Hệ thống gặp sự cố. Vui lòng thử lại sau.",
    logger = console.error,
  } = options;

  const errorMessages: Record<number, string> = {
    400: "Yêu cầu không hợp lệ. Vui lòng kiểm tra thông tin.",
    401: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
    403: "Bạn không có quyền truy cập. Vui lòng liên hệ quản trị viên.",
    404: "Không tìm thấy tài nguyên yêu cầu.",
    405: "Phương thức không được phép.",
    406: "Định dạng không được chấp nhận.",
    408: "Yêu cầu quá thời gian. Vui lòng thử lại.",
    409: "Xung đột dữ liệu. Vui lòng kiểm tra lại thông tin.",
    422: "Dữ liệu không thể xử lý. Vui lòng kiểm tra lại.",
    429: "Quá nhiều yêu cầu. Vui lòng đợi và thử lại.",
    500: "Lỗi máy chủ nội bộ. Vui lòng thử lại sau.",
    501: "Chức năng chưa được triển khai.",
    502: "Máy chủ đang gặp sự cố. Vui lòng thử lại sau.",
    503: "Dịch vụ không khả dụng. Vui lòng thử lại sau.",
    504: "Hết thời gian kết nối. Vui lòng thử lại.",
  };

  const errorHandler = (err: any): Promise<never> => {
    const status = err?.response?.status || err?.status;
    const errorData = err?.response?.data;
    const errorMessage = err?.message;

    logger("Error caught:", err);

    if (!status) {
      message.error("Mất kết nối. Vui lòng kiểm tra đường truyền mạng.");
      return Promise.reject(err);
    }

    // Handle unauthorized errors
    if (status === 401 || status === 403) {
      localStorage.removeItem("edu-token");
      if (redirectOnUnauthorized) {
        message.error(errorMessages[401]);
        setTimeout(() => {
          window.location.replace(loginRedirectPath);
        }, 1000);
      }

      return Promise.reject(err);
    }

    // Handle specific error status codes
    if (status in errorMessages) {
      message.error(errorMessages[status]);
      return Promise.reject(err);
    }

    // Handle client-side errors (4xx)
    if (status >= 400 && status < 500) {
      // Try to use more specific error message from server
      const specificError =
        errorData?.message ||
        errorMessage ||
        "Đã có lỗi xảy ra. Vui lòng thử lại.";

      message.error(specificError);
      return Promise.reject(err);
    }

    // Handle server-side errors (5xx)
    if (status >= 500) {
      message.error(defaultSystemErrorMessage);
      return Promise.reject(err);
    }

    // Fallback error handling
    message.error(defaultSystemErrorMessage);
    return Promise.reject(err);
  };

  return errorHandler;
};

// Usage example
const handleError = createErrorHandler({
  redirectOnUnauthorized: true,
  loginRedirectPath: "/auth/login",
  defaultSystemErrorMessage: "Hệ thống đang gặp sự cố. Vui lòng thử lại sau.",
  logger: (message, error) => {
    // Custom logging logic (e.g., send to monitoring service)
    console.error(message, error);
  },
});

// Add request interceptor
http.interceptors.request.use((config) => {
  const tokenString = localStorage.getItem("edu-token");
  const token: {
    accessToken: string;
    refreshToken: string;
    user: {
      userId: number;
      name: string;
      email: string;
      FEID: string;
      campusId: number | null;
      classId: number;
      roleId: number;
    };
  } | null = tokenString ? JSON.parse(tokenString) : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token?.accessToken}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => handleError(error)
);
export default http;
