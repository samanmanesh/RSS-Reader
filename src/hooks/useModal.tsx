import React, { ReactElement } from "react";
import { atom, useRecoilState } from "recoil";

const modalState = atom({
  key: "modalState",
  default: false,
});

export default function useModal() {
  const [showModal, setShowModal] =
    useRecoilState<boolean>(modalState);

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
