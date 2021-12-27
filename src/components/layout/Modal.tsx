import {
  Dialog,
  Transition,
} from "@headlessui/react";
import React, {
  Fragment,
  ReactElement,
} from "react";

interface Props {
  children: React.ReactElement;
  show: boolean ;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
}

export default function Modal({
  children,
  show,
  onClose,
  onSubmit,
  title,
}: Props): ReactElement {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 grid place-items-center "
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-y-2"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-y-0"
          leaveTo="-translate-y-2"
        >
          <div className="p-16 rounded-md bg-indigo-200 relative z-40">
            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
