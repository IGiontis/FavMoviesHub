import { fetchUsers } from "../services/fetchUsers";
import { describe, expect, it, vi } from "vitest";
import {  getDocs, } from "firebase/firestore";

// 🛠️ Mock το Firestore API
vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    orderBy: vi.fn(),
    getDocs: vi.fn(),
  };
});

describe("fetchUsers", () => {
  const mockUserDocs = [
    { id: "user1", data: () => ({ username: "Alice" }) },
    { id: "user2", data: () => ({ username: "Bob" }) },
  ];

  it("should return an empty array if searchTerm is empty", async () => {
    const result = await fetchUsers("", "currentUserId");
    expect(result).toEqual([]);
  });

  it("should return a list of users excluding the current user", async () => {
    getDocs.mockResolvedValue({ docs: mockUserDocs });

    const result = await fetchUsers("A", "user1"); // user1 = current user
    expect(result).toEqual([{ id: "user2", username: "Bob" }]); // Alice is excluded
  });

  it("should return all users if none match the current user ID", async () => {
    getDocs.mockResolvedValue({ docs: mockUserDocs });

    const result = await fetchUsers("A", "nonExistentUserId");
    expect(result).toEqual([
      { id: "user1", username: "Alice" },
      { id: "user2", username: "Bob" },
    ]);
  });
});
