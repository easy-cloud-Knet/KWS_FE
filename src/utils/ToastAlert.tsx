import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useState } from "react";
import * as ReactDOM from "react-dom/client";

interface ToastAlertProps {
  message: string;
  type: AlertColor;
}

// eslint-disable-next-line 
const Toast: React.FC<ToastAlertProps> = ({ message, type }) => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export const toastAlert = (message: string, type: AlertColor) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);

  root.render(<Toast message={message} type={type} />);

  // 딜레이 여유
  setTimeout(() => {
    root.unmount();
    container.remove();
  }, 3500);
};
