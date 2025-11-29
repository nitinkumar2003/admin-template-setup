"use client";
import React from "react";
import { Modal } from "..";
import ModalSaveButton from "../../button/ModalSaveButton";
import ModalCloseButton from "../../button/ModalCloseButton";
// -----------------------------
// Modal options interface
// -----------------------------
export interface ConfirmModalOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isFullscreen?: boolean;
  showCloseButton?: boolean;
}

// Internal component props
interface ConfirmModalProps {
  options: ConfirmModalOptions;
  onClose: () => void;
  resolve: (value: boolean) => void;
}

// -----------------------------
// The modal component itself
// -----------------------------
const ConfirmModalComponent: React.FC<ConfirmModalProps> = ({
  options,
  onClose,
  resolve,
}) => {
  const {
    title = "Are you sure?",
    message = "Do you want to continue?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    isFullscreen = false,
    showCloseButton = false,
  } = options;

  const handleConfirm = () => {
    resolve(true);
    onClose();
  };

  const handleCancel = () => {
    resolve(false);
    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleCancel}
      isFullscreen={isFullscreen}
      showCloseButton={showCloseButton}
      className="max-w-md w-full mx-auto"
    >
      <div className="flex flex-col items-center p-6 text-center">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>

        <div className="flex justify-end gap-3 mt-4">
          <ModalCloseButton onClick={handleCancel} label= {cancelText} />
          <ModalSaveButton onClick={handleConfirm} label= {confirmText} />
        </div> 
      </div>
    </Modal>
  );
};


export default ConfirmModalComponent