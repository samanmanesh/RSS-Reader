/*
Tailwind UI

Ready for Tailwind CSS v3.0

Components
Documentation
Sidebar Layouts
Application UI
Application Shells
Brand sidebar with light header
Requires JS
Dark sidebar with light header
Requires JS
Light sidebar with light header
Requires JS
Brand sidebar
Requires JS
Dark sidebar
Requires JS
Light sidebar with constrained content area
Requires JS
*/
/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/



import Headbar from "./layout/Headbar";
import Dashboard from "./layout/Dashboard";





export default function Example() {
  //const [sidebarOpen, setSidebarOpen] = useState(false)
  
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <div>
        <div className="md:pl-64 ">
          {/* Dashbord & Profile & sidebar  button wrapper */}
          <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0  bg-red-600 ">
            {/* sidebar button& search & notification &profile dropdown  wrapper */}
            {/* <Headbar /> */}
      
            {/* <Dashboard /> */}
          </div>
        </div>
      </div>
    </>
  );
}

/*Light sidebar with light background
Requires JS
Light sidebar
Requires JS

© 2021 Tailwind Labs Inc. All rights reserved.

Privacy Policy */
