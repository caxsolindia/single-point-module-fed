import { act } from "@testing-library/react";
import { useProfileSummaryStore } from "./ProfileSummaryStore.ts";

describe("useProfileSummaryStore", () => {
  beforeEach(() => {
    // Reset the store state before each test
    const { setProfileSum } = useProfileSummaryStore.getState();
    act(() => {
      setProfileSum("card1"); // Ensure you have a cardId to test
    });
  });
  test("initial state", () => {
    const { profileSum } = useProfileSummaryStore.getState();
    expect(profileSum).toBe("card1");
  });
  test("setTempSummary action", () => {
    const { setProfileSum } = useProfileSummaryStore.getState();
    act(() => {
      setProfileSum("Temporary Summary");
    });
    expect(useProfileSummaryStore.getState().profileSum).toBe(
      "Temporary Summary",
    );
  });
});
