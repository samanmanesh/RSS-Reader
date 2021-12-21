import React, {
  
  useState,
} from "react";

type ReturnType = [boolean, ...Array<() => void>]

export default function useModal() {
  const [showModal, setShowModal] =
    useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return [
    showModal,
    openModal,
    closeModal,
  ] as ReturnType;
}
