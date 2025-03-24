import { vi, describe, it, expect } from "vitest";
import { signInHandler } from "./signInCreateNewServices";
import { signInWithEmailAndPassword } from "firebase/auth";

vi.mock("firebase/auth", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getAuth: vi.fn(() => ({})),
    signInWithEmailAndPassword: vi.fn(),
  };
});

describe("signInHandler", () => {
  // Test successful login
  it("should call signInWithEmailAndPassword with correct parameters", async () => {
    const mockDispatch = vi.fn();
    const mockToggleModal = vi.fn();

    signInWithEmailAndPassword.mockResolvedValue({
      user: { uid: "12345" },
    });

    const values = { usernameEmail: "test@example.com", password: "password123" };

    await expect(signInHandler(values, mockDispatch, mockToggleModal)).resolves.toBeUndefined();

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), values.usernameEmail, values.password);
  });




  // Test invalid email or username
  it("should return early if usernameEmail does not exist", async () => {
    const mockDispatch = vi.fn();
    const mockToggleModal = vi.fn();

    signInWithEmailAndPassword.mockRejectedValue({ code: "auth/user-not-found" });

    const values = { usernameEmail: "wronguser@example.com", password: "password123" };

    await expect(signInHandler(values, mockDispatch, mockToggleModal)).resolves.toBeUndefined();
  });

  // Test incorrect password
  it("should return early if password is incorrect", async () => {
    const mockDispatch = vi.fn();
    const mockToggleModal = vi.fn();

    signInWithEmailAndPassword.mockRejectedValue({ code: "auth/wrong-password" });

    const values = { usernameEmail: "test@example.com", password: "wrongpassword" };

    await expect(signInHandler(values, mockDispatch, mockToggleModal)).resolves.toBeUndefined();
  });

  // Test Firebase internal error
  it("should return early if Firebase fails", async () => {
    const mockDispatch = vi.fn();
    const mockToggleModal = vi.fn();

    signInWithEmailAndPassword.mockRejectedValue({ code: "auth/internal-error" });

    const values = { usernameEmail: "test@example.com", password: "password123" };

    await expect(signInHandler(values, mockDispatch, mockToggleModal)).resolves.toBeUndefined();
  });
});
