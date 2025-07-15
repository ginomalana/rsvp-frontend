/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import Topbar from "../../components/Topbar";
import { useCurrentUser } from "../../hooks/CurrentUserContext";
import { useNavigate } from "react-router";
import { vi, describe, it, beforeEach, expect } from "vitest";

vi.mock("../../hooks/CurrentUserContext");
vi.mock("react-router", () => ({ useNavigate: vi.fn() }));
vi.mock("react-toastify", () => ({ toast: vi.fn() }));

const mockSetUser = vi.fn();
const mockNavigate = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  (useNavigate as any).mockReturnValue(mockNavigate);
});

describe("Topbar", () => {
  it("should render login button when no user", () => {
    (useCurrentUser as any).mockReturnValue({
      user: undefined,
      setUser: mockSetUser,
    });
    render(<Topbar />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should navigate to login on login button click", () => {
    (useCurrentUser as any).mockReturnValue({
      user: undefined,
      setUser: mockSetUser,
    });
    render(<Topbar />);
    fireEvent.click(screen.getByText("Login"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("shuold render logout button and username when user exists", () => {
    (useCurrentUser as any).mockReturnValue({
      user: { username: "testuser" },
      setUser: mockSetUser,
    });
    render(<Topbar />);
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Current User: testuser")).toBeInTheDocument();
  });

  it("should show modal on logout button click", () => {
    (useCurrentUser as any).mockReturnValue({
      user: { username: "testuser" },
      setUser: mockSetUser,
    });
    render(<Topbar />);
    fireEvent.click(screen.getByText("Logout"));
    expect(
      screen.getByText("Are you sure you want to logout?")
    ).toBeInTheDocument();
  });
});
