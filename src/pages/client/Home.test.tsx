import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "./Home";
import { api } from "@/services/api";
import { renderWithStore } from "@/test/renderWithStore";

vi.mock("@/services/api");

vi.mock("@/components/client/Banner", () => ({
  default: () => <div>Banner</div>,
}));

describe("Home page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders banner", async () => {
    const { container } = renderWithStore(<Home />);

    // wait for React effects
    await Promise.resolve();

    expect(container.innerHTML).toContain("Banner");
  });

  it("calls getPublishedProducts on mount", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api.getPublishedProducts as any).mockResolvedValue({
      status: "success",
      data: { productData: [] },
    });

    renderWithStore(<Home />);

    // allow useEffect to run
    await Promise.resolve();

    expect(api.getPublishedProducts).toHaveBeenCalledOnce();
  });
});
