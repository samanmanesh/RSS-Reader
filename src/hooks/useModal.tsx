import React, {
  ReactElement,
  useState,
} from "react";


export default function useModal() {
  const [showModal, setShowModal] =
    useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    openModal,
    closeModal,
  };
}
