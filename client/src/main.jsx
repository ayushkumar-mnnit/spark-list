import { createRoot } from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";

import { App } from "./App.jsx";
import { AuthProvider } from "./assets/context/ContextApi.jsx";

createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ChakraProvider>
);
