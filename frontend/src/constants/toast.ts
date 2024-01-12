import { ElNotification } from "element-plus";

const toast = {
  success: (message: string) => {
    ElNotification({
      title: message,
      type: "success",
      position: "top-left",
    });
  },
  warning: (message: string) => {
    ElNotification({
      title: message,
      type: "warning",
      position: "top-left",
    });
  },
  failed: (message: string, error: any) => {
    ElNotification({
      title: message + ": " + error?.response?.data?.message || "",
      type: "warning",
      position: "top-left",
    });
  },
};

export default toast;
