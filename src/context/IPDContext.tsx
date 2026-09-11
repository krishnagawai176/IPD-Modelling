import { createContext, useContext, useState, type ReactNode } from "react";
import type { Model } from "../data/mockModels";

type User = { email: string; role: string };
type ContextValue = {
  user: User | null;
  selectedModel: Model | null;
  selected: Set<string>;
  variant: string | null;
  setUser: (user: User | null) => void;
  setSelectedModel: (model: Model) => void;
  setSelected: (value: Set<string>) => void;
  setVariant: (value: string) => void;
  signOut: () => void;
};
const IPDContext = createContext<ContextValue | null>(null);
const defaultParts = Array.from(
  { length: 45 },
  (_, index) => `Component ${String(index + 1).padStart(2, "0")}`,
);
export const parts = defaultParts;

export function IPDProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(() =>
    JSON.parse(localStorage.getItem("ipd-user") || "null"),
  );
  const [selectedModel, setSelectedModelState] = useState<Model | null>(() =>
    JSON.parse(localStorage.getItem("ipd-selected-model") || "null"),
  );
  const [selected, setSelectedState] = useState<Set<string>>(
    () =>
      new Set(
        JSON.parse(localStorage.getItem("ipd-selected-parts") || "null") ||
          defaultParts.filter((_, index) => index !== 42 && index !== 43),
      ),
  );
  const [variant, setVariantState] = useState<string | null>(
    () => localStorage.getItem("ipd-variant") || null,
  );
  const setUser = (value: User | null) => {
    setUserState(value);
    value
      ? localStorage.setItem("ipd-user", JSON.stringify(value))
      : localStorage.removeItem("ipd-user");
  };
  const setSelectedModel = (value: Model) => {
    setSelectedModelState(value);
    localStorage.setItem("ipd-selected-model", JSON.stringify(value));
  };
  const setSelected = (value: Set<string>) => {
    setSelectedState(value);
    localStorage.setItem("ipd-selected-parts", JSON.stringify([...value]));
  };
  const setVariant = (value: string) => {
    setVariantState(value);
    localStorage.setItem("ipd-variant", value);
  };
  return (
    <IPDContext.Provider
      value={{
        user,
        selectedModel,
        selected,
        variant,
        setUser,
        setSelectedModel,
        setSelected,
        setVariant,
        signOut: () => setUser(null),
      }}
    >
      {children}
    </IPDContext.Provider>
  );
}
export function useIPD() {
  const value = useContext(IPDContext);
  if (!value) throw new Error("useIPD must be used inside IPDProvider");
  return value;
}
