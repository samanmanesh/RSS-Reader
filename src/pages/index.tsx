import RssTest from "components/RssTest";
import Sidebar from "components/layout/navigation/Sidebar";
import TailwindTemplate from "components/TailwindTemplate";
import { useEffect, useState } from "react";
import Modal from "components/layout/Modal";

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    if (window) {
      document.documentElement.classList.add(
        "dark"
      );
    }
  }, []);

  return (
    <div className="h-full">
      <RssTest />
      {/* <TailwindTemplate  /> */}
      {/* <Sidebar  /> */}
      We are in index
      <button
      onClick={() => setShowModal(true)}
      >
        show modal
      </button>
      <Modal
        title="hello"
        onClose={() => setShowModal(false)}
        onSubmit={() =>  setShowModal(false)}
        show={showModal}
      >
        <div>lskdflsdjkf</div>
      </Modal>
    </div>
  );
}
