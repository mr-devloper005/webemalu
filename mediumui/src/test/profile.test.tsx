import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Profile from "@/pages/Profile";
import { AuthProvider } from "@/contexts/AuthContext";
import { ArticleProvider } from "@/contexts/ArticleContext";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { articles } from "@/data/articles";

// helper to render a profile route
const renderProfile = (path: string) =>
  render(
    <AuthProvider>
      <ArticleProvider>
        <BookmarkProvider>
          <MemoryRouter initialEntries={[path]}>
            <Routes>
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
          </MemoryRouter>
        </BookmarkProvider>
      </ArticleProvider>
    </AuthProvider>
  );

describe("Profile page", () => {
  beforeEach(() => {
    localStorage.clear();
    // sign in a user for tests
    localStorage.setItem(
      "webemalu_user",
      JSON.stringify({
        id: "user-123",
        name: "Test",
        username: "test",
        avatar: "",
        bio: "",
        followers: 0,
        following: 0,
      })
    );
  });

  it("shows follow button when viewing someone else and toggles state", () => {
    // use an existing seeded author id that is not the test user
    const otherId = articles[0].authorId;
    renderProfile(`/profile/${otherId}`);

    const followBtn = screen.getByRole("button", { name: /follow/i });
    expect(followBtn).toBeInTheDocument();

    const followersText = screen.getByText(/Followers/).textContent || "0";
    const initialCount = parseInt(followersText.replace(/[^0-9]/g, ""));

    fireEvent.click(followBtn);
    expect(followBtn).toHaveTextContent(/following/i);

    // after clicking, follower count should increase by 1
    const newFollowersText = screen.getByText(/Followers/).textContent || "0";
    const newCount = parseInt(newFollowersText.replace(/[^0-9]/g, ""));
    expect(newCount).toBe(initialCount + 1);

    // clicking again should unfollow
    fireEvent.click(followBtn);
    expect(followBtn).toHaveTextContent(/follow/i);
    const finalFollowersText = screen.getByText(/Followers/).textContent || "0";
    const finalCount = parseInt(finalFollowersText.replace(/[^0-9]/g, ""));
    expect(finalCount).toBe(initialCount);
  });

  it("displays saved articles in saved tab", () => {
    // prepare one bookmark
    const articleId = articles[0].id;
    localStorage.setItem("webemalu_bookmarks", JSON.stringify([articleId]));

    // render own profile
    renderProfile(`/profile/user-123`);

    // switch to saved
    fireEvent.click(screen.getByRole("button", { name: /saved/i }));
    expect(screen.getByText(articles[0].title)).toBeInTheDocument();
  });

  it("allows editing your profile from the dialog, including uploading a new avatar", async () => {
    // mock FileReader so the file upload is instantaneous
    const OriginalFileReader = global.FileReader;
    class MockReader {
      result = "data:image/png;base64,TEST";
      onload: ((event: any) => void) | null = null;
      readAsDataURL(_blob: Blob) {
        if (this.onload) {
          this.onload({ target: { result: this.result } });
        }
      }
    }
    // @ts-ignore
    global.FileReader = MockReader;

    renderProfile(`/profile/user-123`);
    fireEvent.click(screen.getByRole("button", { name: /edit profile/i }));

    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "NewName" } });

    // upload an avatar using the hidden file input
    const fileInput = screen.getByLabelText(/^upload avatar$/i);
    const file = new File(["dummy"], "avatar.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Save and check updates
    fireEvent.click(screen.getByText(/^Save$/i));
    expect(await screen.findByText(/NewName/)).toBeInTheDocument();

    // new avatar should now be shown in header
    const avatarImg = screen.getAllByRole("img")[0];
    expect(avatarImg).toHaveAttribute("src", expect.stringContaining("data:image"));

    // navbar should also show updated name
    expect(screen.getAllByText(/NewName/)[0]).toBeInTheDocument();

    // restore FileReader
    // @ts-ignore
    global.FileReader = OriginalFileReader;
  });

  it("lets you delete an article from your own profile", () => {
    // create a custom article so it appears first
    const custom = {
      id: "custom-1",
      title: "Tmp Article",
      subtitle: "",
      content: "foo",
      coverImage: "",
      authorId: "user-123",
      publishedAt: new Date().toISOString(),
      readingTime: 1,
      claps: 0,
      tags: [],
    };
    localStorage.setItem("webemalu_articles", JSON.stringify([custom]));

    renderProfile(`/profile/user-123`);
    expect(screen.getByText("Tmp Article")).toBeInTheDocument();
    const deleteBtn = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteBtn);
    // confirm dialog
    window.confirm = () => true;
    // after clicking again maybe, refresh render
    expect(screen.queryByText("Tmp Article")).not.toBeInTheDocument();
  });

  it("allows changing avatar directly from profile header", async () => {
    // mock FileReader again
    const OriginalFileReader = global.FileReader;
    class MockReader {
      result = "data:image/png;base64,HEADER";
      onload: ((event: any) => void) | null = null;
      readAsDataURL(_blob: Blob) {
        if (this.onload) {
          this.onload({ target: { result: this.result } });
        }
      }
    }
    // @ts-ignore
    global.FileReader = MockReader;

    renderProfile(`/profile/user-123`);
    const fileInput = screen.getByLabelText(/upload avatar on page/i);
    const file = new File(["a"], "a.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // avatar image should update
    const avatarImg = await screen.findAllByRole("img");
    expect(avatarImg[0]).toHaveAttribute("src", expect.stringContaining("data:image/png;base64"));

    // restore FileReader
    // @ts-ignore
    global.FileReader = OriginalFileReader;
  });
});
