import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

vi.mock("react-toastify", async () => {
  const actual =
    await vi.importActual<typeof import("react-toastify")>("react-toastify");

  return {
    ...actual,
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    },
    ToastContainer: () =>
      React.createElement("div", { "data-testid": "toast-container" }),
  };
});
