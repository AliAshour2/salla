import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";
import store from "./app/store.ts";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </I18nextProvider>
    </Provider>
  </StrictMode>
);
