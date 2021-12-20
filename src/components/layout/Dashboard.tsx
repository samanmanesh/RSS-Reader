import React, { ReactElement } from "react";

interface Props {}

export default function Dashboard({}: Props): ReactElement {
  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="px-4 sm:px-6 md:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard
          </h1>
        </div>
        <div className="px-4 sm:px-6 md:px-0">
          {/* Replace with your content */}
          <div className="py-4">
            <div className="h-96 border-4 border-dashed border-gray-200 rounded-lg" />
          </div>
          {/* /End replace */}
        </div>
      </div>
    </main>
  );
}
