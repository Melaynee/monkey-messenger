import Image from "next/image";
import React from "react";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = (props) => {
  if (!src) return null;
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="w-80 h-80">
        <Image alt="Image" className="object-cover" fill src={props.src!} />
      </div>
    </Modal>
  );
};

export default ImageModal;
