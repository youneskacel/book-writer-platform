import React from "react";
import { X } from "lucide-react";
interface IProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({
  children,
  onClose,
}: IProps) => {
  return (
    <div className="w-full h-full absolute z-[20] top-0 left-0 flex items-center justify-center backdrop-blur-sm bg-[#00000010]">
      <div className="bg-white min-w-[50%] min-h-[50%] relative rounded-lg p-5">
        <div className="absolute top-[15px] right-[20px] cursor-pointer flex items-stretch"
        onClick={onClose}
        >
            <X size={16} />
        </div>
            {children}
      </div>
    </div>
  );
};

export default Modal;
