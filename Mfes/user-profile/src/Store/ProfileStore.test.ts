import { act } from "@testing-library/react";
import { useProfileStore } from "./ProfileStore.ts";

describe("useProfileStore", () => {
  beforeEach(() => {
    // Reset the store state before each test
    const {
      setEditMode,
      setDrawerMode,
      setContactNumber,
      setContactError,
      toggleCardExpansion,
    } = useProfileStore.getState();
    act(() => {
      setEditMode("card1", false); // Ensure you have a cardId to test
      setDrawerMode("card1", false); // Ensure you have a cardId to test
      setContactNumber("");
      setContactError("");
      toggleCardExpansion("card1"); // Ensure you have a cardId to test
    });
  });
  test("setEditMode action", () => {
    const { setEditMode } = useProfileStore.getState();
    const cardId = "card1";
    act(() => {
      setEditMode(cardId, true);
    });
    expect(useProfileStore.getState().editModes[cardId]).toBe(true);
    act(() => {
      setEditMode(cardId, false);
    });
    expect(useProfileStore.getState().editModes[cardId]).toBe(false);
  });
  test("setDrawerMode action", () => {
    const { setDrawerMode } = useProfileStore.getState();
    const cardId = "card1";
    act(() => {
      setDrawerMode(cardId, true);
    });
    expect(useProfileStore.getState().drawerModes[cardId]).toBe(true);
    act(() => {
      setDrawerMode(cardId, false);
    });
    expect(useProfileStore.getState().drawerModes[cardId]).toBe(false);
  });
  test("setContactNumber action", () => {
    const { setContactNumber } = useProfileStore.getState();
    act(() => {
      setContactNumber("123-456-7890");
    });
    expect(useProfileStore.getState().contactNumber).toBe("123-456-7890");
  });
  test("setContactError action", () => {
    const { setContactError } = useProfileStore.getState();
    act(() => {
      setContactError("Invalid number");
    });
    expect(useProfileStore.getState().contactError).toBe("Invalid number");
  });
  test("toggleCardExpansion action", () => {
    const { toggleCardExpansion } = useProfileStore.getState();
    const cardId = "";
    act(() => {
      toggleCardExpansion(cardId);
    });
    expect(useProfileStore.getState().expandedCardIds).toContain(cardId);
    act(() => {
      toggleCardExpansion(cardId);
    });
    expect(useProfileStore.getState().expandedCardIds).not.toContain(cardId);
  });
});
