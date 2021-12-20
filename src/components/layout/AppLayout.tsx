import React, { ReactElement } from "react";
import Dashboard from "./Dashboard";
import Headbar from "components/layout/Headbar";
import Sidebar from "components/layout/navigation/Sidebar";

interface Props {
  children: React.ReactElement;
}

export default function AppLayout({
  children,
}: Props): ReactElement {
  return (
    <div className="bg-indigo-900 min-h-screen ">
      {/* Dashbord & Profile & sidebar  button wrapper */}
      <div className=" bg-red-600 ">
        {/* sidebar button& search & notification &profile dropdown  wrapper */}
        <Sidebar />
        <div className="md:pl-64">
          <Headbar />
          {children}
        </div>
        {/* <Dashboard /> */}
      </div>
    </div>
  );
}
