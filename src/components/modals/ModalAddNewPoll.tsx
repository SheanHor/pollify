import React from "react";

import { Modal } from "../common/BaseModal";
import Button from "../common/Button";
import Input from "../common/Input";

type ModalAddNewPollProps = {
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
  onValue: (value: string) => void;
  value: string;
};

const ModalAddNewPoll = ({
  visible,
  onSuccess,
  onCancel,
  onValue,
  value,
}: ModalAddNewPollProps) => {
  return (
    <Modal
      title="Your question:"
      closeButton
      visible={visible}
      onCancel={onCancel}
      titleClassName="font-semibold text-[18px] mt-4"
      className="max-w-xl w-full"
    >
      <div className="mt-6">
        <Input onChange={(e) => onValue(e.target.value)} />

        <div className="grid grid-cols-2 gap-2 md:gap-4 mt-10">
          <Button
            variant="primary"
            size="small"
            onClick={onSuccess}
            disabled={value === ""}
          >
            Add
          </Button>
          <Button variant="secondary" size="small" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddNewPoll;
