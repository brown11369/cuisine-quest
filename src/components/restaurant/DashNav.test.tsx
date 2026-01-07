import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DashNav from "./DashNav";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "@/redux/slice/restaurantSlice";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as reduxHooks from "@/redux/hooks";
import { toast } from "react-toastify";

// Mock toast
vi.mock("react-toastify", () => ({
  toast: vi.fn(),
  ToastContainer: () => <div data-testid="toast-container" />,
}));

// Mock react-router-dom hooks
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("DashNav component", () => {
  const store = configureStore({
    reducer: { restaurant: restaurantReducer },
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all menu items and toast container", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DashNav />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Log Out")).toBeInTheDocument();
    expect(screen.getByTestId("toast-container")).toBeInTheDocument();
  });

  it("calls dispatch and navigate on successful logout", async () => {
    const mockDispatch = vi.fn();
    // Mock useAppDispatch hook
    vi.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(mockDispatch);

    // Mock fetch
    vi.spyOn(window, "fetch").mockResolvedValue({
      ok: true,
      json: vi.fn(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DashNav />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByText("Log Out"));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/restaurant/authentication");
    });
  });

  it("shows toast on logout failure", async () => {
    const errorMessage = "Logout failed!";
    vi.spyOn(window, "fetch").mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({ message: errorMessage }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DashNav />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByText("Log Out"));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(errorMessage);
    });
  });
});
