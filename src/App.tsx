import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { IPDProvider, useIPD } from "./context/IPDContext";
import AppLayout from "./components/layout/AppLayout";
import ConfigurePage from "./pages/ConfigurePage";
import CreateModelPage from "./pages/CreateModelPage";
import DeliverPage from "./pages/DeliverPage";
import GeneratePage from "./pages/GeneratePage";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage";
import SelectModelPage from "./pages/SelectModelPage";

function Protected({ children }: { children: ReactNode }) {
  return useIPD().user ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<LoginPage signup />} />
      <Route
        path="/select-model"
        element={
          <Protected>
            <SelectModelPage />
          </Protected>
        }
      />
      <Route
        path="/create-model"
        element={
          <Protected>
            <CreateModelPage />
          </Protected>
        }
      />
      <Route
        path="/configure"
        element={
          <Protected>
            <ConfigurePage />
          </Protected>
        }
      />
      <Route
        path="/generate"
        element={
          <Protected>
            <GeneratePage />
          </Protected>
        }
      />
      <Route
        path="/deliver"
        element={
          <Protected>
            <DeliverPage />
          </Protected>
        }
      />
      <Route
        path="/job-history"
        element={
          <Protected>
            <HistoryPage />
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <IPDProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </IPDProvider>
  );
}
