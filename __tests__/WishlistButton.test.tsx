import { render, screen, fireEvent } from "@testing-library/react";
import WishlistButton from "@/components/WishlistButton";
import { WishlistProvider } from "@/context/WishlistContext";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] ?? null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Helper to render WishlistButton with its required provider
function renderWithProvider(slug: string, showLabel = true) {
  return render(
    <WishlistProvider>
      <WishlistButton slug={slug} showLabel={showLabel} />
    </WishlistProvider>
  );
}

describe("WishlistButton", () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('menampilkan "Add to Wishlist" saat belum di-wishlist', () => {
    renderWithProvider("elden-ring", true);
    expect(screen.getByText("Add to Wishlist")).toBeInTheDocument();
  });

  it("memiliki aria-label yang sesuai", () => {
    renderWithProvider("elden-ring");
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Add to wishlist");
  });

  it("toggle ke wishlist saat diklik", () => {
    renderWithProvider("elden-ring", true);
    const button = screen.getByRole("button");

    // Klik pertama — add
    fireEvent.click(button);
    expect(screen.getByText("Remove from Wishlist")).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Remove from wishlist");

    // Klik kedua — remove
    fireEvent.click(button);
    expect(screen.getByText("Add to Wishlist")).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Add to wishlist");
  });

  it("menyimpan wishlist ke localStorage", () => {
    renderWithProvider("elden-ring", true);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "gamevault-wishlist",
      JSON.stringify(["elden-ring"])
    );
  });

  it("menghapus dari localStorage saat toggle off", () => {
    renderWithProvider("elden-ring", true);
    const button = screen.getByRole("button");

    // Add then remove
    fireEvent.click(button);
    fireEvent.click(button);
    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      "gamevault-wishlist",
      JSON.stringify([])
    );
  });

  it("tidak menampilkan label jika showLabel=false", () => {
    renderWithProvider("elden-ring", false);
    expect(screen.queryByText("Add to Wishlist")).not.toBeInTheDocument();
    // Button should still be present
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
