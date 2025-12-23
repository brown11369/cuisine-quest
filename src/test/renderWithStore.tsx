import React, { act } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import productReducer from "@/redux/slice/productSlice";

export function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      product: productReducer,
    },
  });

  const container = document.createElement("div");
  document.body.appendChild(container);

  act(() => {
    const root = createRoot(container);
    root.render(<Provider store={store}>{ui}</Provider>);
  });

  return { container, store };
}
