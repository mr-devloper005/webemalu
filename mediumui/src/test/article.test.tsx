import { render, screen, fireEvent } from "@testing-library/react";
import ArticlePage from "@/pages/ArticlePage";
import { ArticleProvider } from "@/contexts/ArticleContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";

const renderArticle = (path: string) =>
  render(
    <AuthProvider>
      <ArticleProvider>
        <BookmarkProvider>
          <MemoryRouter initialEntries={[path]}>
            <Routes>
              <Route path="/article/:id" element={<ArticlePage />} />
            </Routes>
          </MemoryRouter>
        </BookmarkProvider>
      </ArticleProvider>
    </AuthProvider>
  );

describe("Article page", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      "webemalu_user",
      JSON.stringify({ id: "user-123", name: "Me", username: "me", avatar: "", bio: "", followers: 0, following: 0 })
    );
  });

  it("shows edit/delete when user is author and allows deletion", () => {
    // create custom article authored by user
    const custom = {
      id: "custom-article",
      title: "My story",
      subtitle: "",
      content: "hello",
      coverImage: "",
      authorId: "user-123",
      publishedAt: new Date().toISOString(),
      readingTime: 1,
      claps: 0,
      tags: [],
    };
    localStorage.setItem("webemalu_articles", JSON.stringify([custom]));

    renderArticle(`/article/${custom.id}`);
    expect(screen.getByText("My story")).toBeInTheDocument();
    const editBtn = screen.getByRole("button", { name: /edit/i });
    expect(editBtn).toBeInTheDocument();
    const deleteBtn = screen.getByRole("button", { name: /delete/i });
    expect(deleteBtn).toBeInTheDocument();

    // click delete and confirm
    window.confirm = () => true;
    fireEvent.click(deleteBtn);
    expect(screen.queryByText("My story")).not.toBeInTheDocument();
  });

  it("toggles article clap and persists like state", () => {
    // scroll to top should be called on mount
    window.scrollTo = vi.fn();
    const custom = {
      id: "clap-story",
      title: "Clap story",
      subtitle: "",
      content: "hi",
      coverImage: "",
      authorId: "user-123",
      publishedAt: new Date().toISOString(),
      readingTime: 1,
      claps: 0,
      tags: [],
    };
    localStorage.setItem("webemalu_articles", JSON.stringify([custom]));

    renderArticle(`/article/${custom.id}`);
    const clapBtn = screen.getByRole("button", { name: /0/i });
    fireEvent.click(clapBtn);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(clapBtn).toHaveTextContent("1");
    expect(clapBtn).toHaveClass("text-primary");
    // clicking again should unlike
    fireEvent.click(clapBtn);
    expect(clapBtn).toHaveTextContent("0");
    expect(clapBtn).not.toHaveClass("text-primary");
  });

  it("allows liking and replying to comments", () => {
    // render a page with default comments for article 1
    renderArticle(`/article/1`);
    // there should be at least one comment
    const firstClap = screen.getAllByRole("button", { name: /\d+/i })[1];
    // like the comment
    fireEvent.click(firstClap);
    expect(firstClap).toHaveClass("text-primary");
    const initialCount = parseInt(firstClap.textContent || "0");
    expect(initialCount).toBeGreaterThan(0);

    // reply to first comment
    const replyBtn = screen.getAllByText(/reply/i)[0];
    fireEvent.click(replyBtn);
    const replyTextarea = screen.getByPlaceholderText(/write a reply/i);
    fireEvent.change(replyTextarea, { target: { value: "Nice reply" } });
    fireEvent.click(screen.getByText(/post reply/i));
    expect(screen.getByText(/nice reply/i)).toBeInTheDocument();
  });
});
