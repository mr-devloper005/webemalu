import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "@/components/Footer";

describe("Footer links", () => {
  it("renders all expected links with proper hrefs", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const links = [
      { name: /About/i, href: "/about" },
      { name: /Help/i, href: "/help" },
      { name: /Status/i, href: "/status" },
      { name: /Careers/i, href: "/careers" },
      { name: /Terms/i, href: "/terms" },
      { name: /Privacy/i, href: "/privacy" },
    ];

    links.forEach(({ name, href }) => {
      const link = screen.getByRole("link", { name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });
});
