import React, { useEffect, useState } from "react";
import "./App.css"; // Make sure to include custom styles for animations in this file
import { Provider } from "@gadgetinc/react";
import { api } from "./api/api";
import gadget_bg from "./assets/gadget_bg.png"; // Ensure the asset is in the correct directory

function App() {
  const [appName, setAppName] = useState("");
  const [darkMode, setDarkMode] = useState(false); // State to toggle dark mode

  useEffect(() => {
    // Fetch the app name using the API
    api
      .query(
        `
      query GetAppName {
        gadgetMeta {
          slug
        }
      }
    `
      )
      .then((response) => {
        if (response?.gadgetMeta?.slug) {
          setAppName(response.gadgetMeta.slug);
        }
      })
      .catch((error) => {
        console.error("Error fetching app name:", error);
      });
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode); // Function to toggle dark mode

  // Define the base and mode-specific Tailwind CSS classes

  return (
    <Provider api={api}>
      <div className="App container  shadow-lg flex flex-col items-center space-y-4 bg-white text-gray-800">
        <div>
          <p className="text-lg">{appName || "Loading..."}</p>
        </div>
        <footer className="flex items-center">
          {" "}
          {/* Flex container, align items vertically */}
          <h1 className="text-l font-bold mr-1">Made with Gadget</h1>{" "}
          {/* Your existing h1 styling with right margin */}
          <img src={gadget_bg} alt="Gadget logo" className="w-12" />{" "}
          {/* w-12 is for width, you can adjust as needed */}
        </footer>
      </div>
    </Provider>
  );
}

export default App;
