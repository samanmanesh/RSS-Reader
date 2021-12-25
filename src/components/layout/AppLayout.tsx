import React, { ReactElement } from "react";
import Dashboard from "./FeedItem";
import TopBar from "components/layout/TopBar";
import Sidebar from "components/layout/navigation/Sidebar";

interface Props {
  children: React.ReactElement;
}

export default function AppLayout({
  children,
}: Props): ReactElement {
  return (
    <div className="min-h-screen ">
      {/* Dashbord & Profile & sidebar  button wrapper */}
      <div>
        {/* sidebar button& search & notification &profile dropdown  wrapper */}
        <Sidebar />
        <div className="md:pl-64">
          <div className="mx-auto max-w-4xl">
            <TopBar />
            {children}
          </div>
        </div>
        {/* <Dashboard /> */}
      </div>
    </div>
  );
}
