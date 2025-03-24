import { fetchUsername } from "../services/fetchUsername";
import { describe, expect, it, vi } from "vitest";
import {  getDoc } from "firebase/firestore";

// Mock Firebase functions
vi.mock("firebase/firestore", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      doc: vi.fn(),
      getDoc: vi.fn(),
    };
  });
  
describe("fetchUsername", () => {
  it("should return 'Unknown User' if userId is undefined", async () => {
    const result = await fetchUsername(undefined);
    expect(result).toBe("Unknown User");
  });

  it("should return 'Unknown User' if user does not exist", async () => {
    getDoc.mockResolvedValue({ exists: () => false });

    const result = await fetchUsername("nonexistentUserId");
    expect(result).toBe("Unknown User");
  });

  it("should return the username if user exists", async () => {
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ username: "JohnDoe" }),
    });

    const result = await fetchUsername("validUserId");
    expect(result).toBe("JohnDoe");
  });
});
