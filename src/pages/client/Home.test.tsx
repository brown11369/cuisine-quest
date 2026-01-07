import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";
import { api } from "@/services/api";
import { renderWithStore } from "@/test/renderWithStore";

vi.mock("@/services/api");

vi.mock("@/components/client/Banner", () => ({
  default: () => <div>Banner</div>,
}));

// ✅ REQUIRED: mock toast side effects
vi.mock("react-toastify", async () => {
  const actual =
    await vi.importActual<typeof import("react-toastify")>("react-toastify");

  return {
    ...actual,
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe("Home page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const home = render(<Home />);

  it("renders banner", async () => {
    console.log("====>", home);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api.getPublishedProducts as any).mockResolvedValue({
      status: "success",
      data: { productData: [] },
    });

    renderWithStore(<Home />);

    expect(await screen.findByText("Banner")).toBeInTheDocument();
  });

  it("calls getPublishedProducts on mount", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api.getPublishedProducts as any).mockResolvedValue({
      status: "success",
      data: { productData: [] },
    });

    renderWithStore(<Home />);

    await waitFor(() => {
      expect(api.getPublishedProducts).toHaveBeenCalledTimes(1);
    });
  });
});
