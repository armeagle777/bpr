import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import { PersonsProvider } from "./components/context/persons";
import { CompaniesProvider } from "./components/context/companies";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <PersonsProvider>
      <CompaniesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CompaniesProvider>
    </PersonsProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
