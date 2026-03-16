import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Write from "@/pages/Write";
import { ArticleProvider } from "@/contexts/ArticleContext";
import { AuthProvider } from "@/contexts/AuthContext";

// mock navigate so we can assert it was called
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => {
  const original = vi.importActual("react-router-dom");
  return {
    __esModule: true,
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("Write page", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
    // make sure there is a user logged in
    localStorage.setItem(
      "webemalu_user",
      JSON.stringify({ id: "user-123", name: "Test", username: "test", avatar: "", bio: "", followers: 0, following: 0 })
    );
  });

  it("publishes a new article and navigates", () => {
    render(
      <AuthProvider>
        <ArticleProvider>
          <MemoryRouter>
            <Write />
          </MemoryRouter>
        </ArticleProvider>
      </AuthProvider>
    );

    const titleInput = screen.getByPlaceholderText(/Title/i);
    const contentInput = screen.getByPlaceholderText(/Tell your story/i);
    const publishButton = screen.getByText(/^Publish$/i);

    fireEvent.change(titleInput, { target: { value: "My Test Title" } });
    fireEvent.change(contentInput, { target: { value: "Content goes here." } });
    fireEvent.click(publishButton);

    expect(mockNavigate).toHaveBeenCalled();
    const calledPath = mockNavigate.mock.calls[0][0];
    expect(calledPath).toMatch(/\/article\/[0-9]+/);

    const stored = JSON.parse(localStorage.getItem("webemalu_articles") || "[]");
    expect(stored.length).toBe(1);
    expect(stored[0].title).toBe("My Test Title");
  });
  
  it("toolbar buttons apply formatting to editable content", () => {
    render(
      <AuthProvider>
        <ArticleProvider>
          <MemoryRouter>
            <Write />
          </MemoryRouter>
        </ArticleProvider>
      </AuthProvider>
    );
    const editor = screen.getByRole("textbox");
    // simulate typing by setting innerHTML and dispatching input
    editor.innerHTML = "hello";
    fireEvent.input(editor);
    const boldBtn = screen.getByTitle(/Bold/i);
    fireEvent.click(boldBtn);
    expect(editor.innerHTML.toLowerCase()).toContain("<b>hello</b>");

    // also test italic works
    editor.innerHTML = "world";
    fireEvent.input(editor);
    const italicBtn = screen.getByTitle(/Italic/i);
    fireEvent.click(italicBtn);
    expect(editor.innerHTML.toLowerCase()).toContain("<i>world</i>");
  });

  it("allows editing an existing article", () => {
    // first publish
    render(
      <AuthProvider>
        <ArticleProvider>
          <MemoryRouter>
            <Write />
          </MemoryRouter>
        </ArticleProvider>
      </AuthProvider>
    );
    const titleInput = screen.getByPlaceholderText(/Title/i);
    const contentInput = screen.getByPlaceholderText(/Tell your story/i);
    const publishButton = screen.getByText(/^Publish$/i);
    fireEvent.change(titleInput, { target: { value: "Original" } });
    fireEvent.change(contentInput, { target: { value: "foo" } });
    fireEvent.click(publishButton);

    const stored = JSON.parse(localStorage.getItem("webemalu_articles") || "[]");
    const id = stored[0].id;
    mockNavigate.mockClear();
    
    // reopen write page in edit mode
    render(
      <AuthProvider>
        <ArticleProvider>
          <MemoryRouter initialEntries={[`/write?edit=${id}`]}>
            <Write />
          </MemoryRouter>
        </ArticleProvider>
      </AuthProvider>
    );
    expect(screen.getByPlaceholderText(/Title/i)).toHaveValue("Original");
    fireEvent.change(titleInput, { target: { value: "Updated" } });
    fireEvent.click(publishButton);
    expect(mockNavigate).toHaveBeenCalledWith(`/article/${id}`);
    const updated = JSON.parse(localStorage.getItem("webemalu_articles") || "[]");
    expect(updated[0].title).toBe("Updated");
  });

  it("shows delete button while editing and removes article", () => {
    // prepare existing
    const existing = {
      id: "del-test",
      title: "ToDelete",
      subtitle: "",
      content: "x",
      coverImage: "",
      authorId: "user-123",
      publishedAt: new Date().toISOString(),
      readingTime: 1,
      claps: 0,
      tags: [],
    };
    localStorage.setItem("webemalu_articles", JSON.stringify([existing]));

    render(
      <AuthProvider>
        <ArticleProvider>
          <MemoryRouter initialEntries={[`/write?edit=${existing.id}`]}>
            <Write />
          </MemoryRouter>
        </ArticleProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
    window.confirm = () => true;
    fireEvent.click(screen.getByText(/Delete/i));
    const left = JSON.parse(localStorage.getItem("webemalu_articles") || "[]");
    expect(left.find((a: any) => a.id === existing.id)).toBeUndefined();
  });

  it("requires title and content before publishing", () => {
    render(
      <AuthProvider>
        <ArticleProvider>
          <MemoryRouter>
            <Write />
          </MemoryRouter>
        </ArticleProvider>
      </AuthProvider>
    );

    const publishButton = screen.getByText(/^Publish$/i);
    fireEvent.click(publishButton);
    // should not navigate when required fields are missing
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("allows selecting tags up to five", () => {
    render(
      <AuthProvider>
        <ArticleProvider>
          <MemoryRouter>
            <Write />
          </MemoryRouter>
        </ArticleProvider>
      </AuthProvider>
    );

    fireEvent.click(screen.getByText(/\+ Add tag/i));
    const firstTag = screen.getByRole("button", { name: /Programming/i });
    fireEvent.click(firstTag);
    expect(screen.getByText(/Programming/)).toBeInTheDocument();

    // open again and select more
    fireEvent.click(screen.getByText(/\+ Add tag/i));
    const secondTag = screen.getByRole("button", { name: /Technology/i });
    fireEvent.click(secondTag);
    expect(screen.getByText(/Technology/)).toBeInTheDocument();

    // simulate adding five tags
    fireEvent.click(screen.getByText(/\+ Add tag/i));
    const tagButtons = screen.getAllByRole("button", { name: /./ });
    // pick first five distinct tags
    for (let i = 0; i < 5; i++) {
      fireEvent.click(tagButtons[i]);
    }
    // only up to 5 should be rendered
    const badges = screen.getAllByText(/^[A-Za-z ]+$/); // rough selector
    expect(badges.length).toBeLessThanOrEqual(5);
  });
});
