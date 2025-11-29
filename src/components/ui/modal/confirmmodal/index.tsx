import ReactDOM from "react-dom/client";
import ConfirmModalComponent from "./ConfirmModal";
export interface ConfirmModalOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isFullscreen?: boolean;
  showCloseButton?: boolean;
}



// @@ this is use cased
//  const confirmed = await confirmModal({
//       title: "Delete Item?",
//       message: "Are you sure you want to delete this item?",
//       confirmText: "Yes, Delete",
//       cancelText: "Cancel",
//     });
export const confirmModal = (
  options: ConfirmModalOptions = {}
): Promise<boolean> => {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const root = ReactDOM.createRoot(div);

    const cleanup = () => {
      root.unmount();
      div.remove();
    };

    const handleClose = () => {
      cleanup();
    };

    root.render(
      <ConfirmModalComponent
        options={options}
        onClose={handleClose}
        resolve={resolve}
      />
    );
  });
};