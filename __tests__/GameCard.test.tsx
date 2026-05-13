import { render, screen } from "@testing-library/react";
import GameCard from "@/components/GameCard";

// Mock next/image — render as plain <img>, strip Next.js-specific props
jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  default: ({ fill, fetchPriority, sizes, ...props }: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock next/link — render as plain <a>
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockGame = {
  id: "1",
  title: "Elden Ring",
  slug: "elden-ring",
  coverImage: "https://picsum.photos/seed/eldenring/400/600",
  rating: 9.5,
  genres: ["RPG", "Action"],
  platforms: ["PC", "PS5"],
  price: 450000,
  releaseDate: "2022-02-25",
  developer: "FromSoftware",
  publisher: "Bandai Namco",
  description: "Action RPG open world epik.",
  longDescription: "Lorem ipsum...",
  screenshots: [],
  tags: [],
  featured: true,
};

describe("GameCard", () => {
  it("menampilkan judul game", () => {
    render(<GameCard game={mockGame} />);
    expect(screen.getByText("Elden Ring")).toBeInTheDocument();
  });

  it("menampilkan rating game", () => {
    render(<GameCard game={mockGame} />);
    expect(screen.getByText("9.5")).toBeInTheDocument();
  });

  it("menampilkan genre game", () => {
    render(<GameCard game={mockGame} />);
    expect(screen.getByText("RPG")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("menampilkan harga dalam format IDR", () => {
    render(<GameCard game={mockGame} />);
    // formatPrice returns "Rp450.000" for 450000
    expect(screen.getByText(/Rp\s?450\.000/)).toBeInTheDocument();
  });

  it('menampilkan "Free" jika harga 0', () => {
    render(<GameCard game={{ ...mockGame, price: 0 }} />);
    expect(screen.getByText("Free")).toBeInTheDocument();
  });

  it("menampilkan cover image dengan alt text", () => {
    render(<GameCard game={mockGame} />);
    const img = screen.getByAltText("Elden Ring");
    expect(img).toBeInTheDocument();
  });

  it("link mengarah ke halaman detail game", () => {
    render(<GameCard game={mockGame} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/games/elden-ring");
  });

  it("hanya menampilkan maksimal 2 genre", () => {
    const gameWith3Genres = {
      ...mockGame,
      genres: ["RPG", "Action", "Adventure"],
    };
    render(<GameCard game={gameWith3Genres} />);
    expect(screen.getByText("RPG")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.queryByText("Adventure")).not.toBeInTheDocument();
  });
});
