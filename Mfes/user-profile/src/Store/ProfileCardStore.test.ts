import { act } from "@testing-library/react";
import { useProfileCardStore } from "./ProfileCardStore.ts";

describe("useProfileCardStore", () => {
  beforeEach(() => {
    const { closeModal, closeDrawer } = useProfileCardStore.getState();
    act(() => {
      closeModal();
      closeDrawer();
    });
  });

  test("initial state", () => {
    const { isModalOpen, isDrawerOpen } = useProfileCardStore.getState();
    expect(isModalOpen).toBe(false);
    expect(isDrawerOpen).toBe(false);
  });

  test("open and close modal", () => {
    const { openModal, closeModal } = useProfileCardStore.getState();

    act(() => {
      openModal("01");
    });
    expect(useProfileCardStore.getState().isModalOpen).toBe(true);

    act(() => {
      closeModal();
    });
    expect(useProfileCardStore.getState().isModalOpen).toBe(false);
  });

  test("open and close drawer", () => {
    const { openDrawer, closeDrawer } = useProfileCardStore.getState();

    act(() => {
      openDrawer("01");
    });
    expect(useProfileCardStore.getState().isDrawerOpen).toBe(true);

    act(() => {
      closeDrawer();
    });
    expect(useProfileCardStore.getState().isDrawerOpen).toBe(false);
  });
});
