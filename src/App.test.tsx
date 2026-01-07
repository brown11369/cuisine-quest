import { render } from "@testing-library/react";
import App from "./App";
import { describe, it, expect, vi } from "vitest";

// ✅ Mock RouterProvider completely
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    RouterProvider: () => <div>Router</div>,
  };
});

// ✅ Mock React Query Devtools
vi.mock("@tanstack/react-query-devtools", () => ({
  ReactQueryDevtools: () => null,
}));

describe("App Component", () => {
  it("renders the App component", () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });
});
