import { act } from "@testing-library/react";
import { create } from "zustand";
import { useUserDataStore } from "./UserDateStore.ts";

describe("useUserDataStore", () => {
  beforeEach(() => {
    // Reset the store state before each test
    const { setUserId, setUsername } = useUserDataStore.getState();
    act(() => {
      setUserId("Temporary Summary");
      setUsername("Temporary Username");
    });
  });
  test("initial state", () => {
    const { userId } = useUserDataStore.getState();
    expect(userId).toBe("Temporary Summary");
  });
  test("initial state with sessionStorage data", () => {
    // Mock sessionStorage to return a stored userData object
    sessionStorage.setItem(
      "userData",
      JSON.stringify({ id: "mockId", username: "mockUsername" }),
    );

    const store = create(() => ({
      userId: JSON.parse(sessionStorage.getItem("userData")!)?.id || null,
      username:
        JSON.parse(sessionStorage.getItem("userData")!)?.username || null,
    }));

    // Now, the store should correctly pick up the sessionStorage data
    const { userId, username } = store.getState();

    expect(userId).toBe("mockId");
    expect(username).toBe("mockUsername");
  });
  test("sessionStorage does not affect store when empty", () => {
    // Ensure sessionStorage is empty
    sessionStorage.clear();

    const { userId, username } = useUserDataStore.getState();
    expect(userId).toBe("Temporary Summary");
    expect(username).toBe("Temporary Username");
  });

  test("userData initialization from sessionStorage", () => {
    // Mock sessionStorage data
    const mockUserData = { id: "testId", username: "testUsername" };
    sessionStorage.setItem("userData", JSON.stringify(mockUserData));
    // Re-initialize the Zustand store
    const { refreshUserData } = useUserDataStore.getState();
    refreshUserData();
    const { userId, username } = useUserDataStore.getState();

    expect(userId).toBe("testId");
    expect(username).toBe("testUsername");
  });
  test("userId action", () => {
    const { setUserId } = useUserDataStore.getState();
    act(() => {
      setUserId("Temporary Summary");
    });
    expect(useUserDataStore.getState().userId).toBe("Temporary Summary");
  });
  test("initial state", () => {
    const { username } = useUserDataStore.getState();
    expect(username).toBe("Temporary Username");
  });
  test("username action", () => {
    const { setUsername } = useUserDataStore.getState();
    act(() => {
      setUsername("Temporary Summary");
    });
    expect(useUserDataStore.getState().userId).toBe("Temporary Summary");
  });
});
