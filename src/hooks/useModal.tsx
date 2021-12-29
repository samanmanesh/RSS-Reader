import React, { useState } from "react";

type ReturnType = [boolean, ...Array<() => void>];

export default function useModal() {
  const [showModal, setShowModal] =
    useState<boolean>(false);
  const [showError, setShowError] =
    useState<boolean>(false);

  const openModal = () => {
    closeErrorState();
    setShowModal(true);
  };

  const closeModal = () => {
    closeErrorState();
    setShowModal(false);
    

  };

  const showErrorState = () => {
    setShowError(true);
  };

  const closeErrorState = () => {
    setShowError(false);
  };

  return [
    showModal,
    openModal,
    closeModal,
    showError,
    showErrorState,
    closeErrorState
  ] as ReturnType;
}
