import { act } from "@testing-library/react";
import { useUserCertificateStore } from "./CertificatesStore.ts";

const userSkillMock = {
  certificateID: "cert456",
  certificateName: "Test Certificate 2",
  organizationName: "Test Organization 2",
  certificateIssueDate: "2023-02-01",
  certificateExpiryDate: "2024-02-01",
  certificateImageURL: null,
  certificateURL: "http://cert01.com",
  skillId: "123",
  skill: null,
  file: null,
};
const userSkillArrayMock = [userSkillMock];
// const userSkillUpdateMock = {
//   certificateID: "cert456",
//   certificateName: "Test Certificate 01",
//   organizationName: "Test Organization 2",
//   certificateIssueDate: "2023-02-01",
//   certificateExpiryDate: "2024-02-01",
//   certificateImageURL:null,
//   certificateURL:"http://cert01.com",
//   skillId:"123",
// };
// const userSkillArrayUpdateMock = [userSkillUpdateMock];
// const userSkillNoSkillId = {
//   certificateID: "cert123",
//   certificateName: "Test Certificate 2",
//   organizationName: "Test Organization 2",
//   certificateIssueDate: "2023-02-01",
//   certificateExpiryDate: "2024-02-01",
//   certificateImageURL:null,
//   certificateURL:"http://cert01.com",
//   skillId:"123",
// };
const { setUserCertificate, deleteUserCertificate, setIdSelected } =
  useUserCertificateStore.getState();
describe("empty store", () => {
  test("delete skill when store empty", () => {
    act(() => {
      deleteUserCertificate("577565e5-3ef6-48bb-b514-a01ec6352055");
    });
    expect(useUserCertificateStore.getState().userCertificate).toStrictEqual(
      [],
    );
  });

  // test("update skill when store empty", () => {
  //   act(() => {
  //     updateUserSkill([userSkillUpdateMock]);
  //   });
  //   expect(useUserCertificateStore.getState().userSkill).toStrictEqual([]);
  // });
});
describe("useUserCertificateStore", () => {
  beforeAll(() => {
    // Reset the store state before each test
    act(() => {
      setUserCertificate(userSkillArrayMock);
    });
  });
  afterEach(() => {
    act(() => {
      setUserCertificate([]);
    });
  });
  test("initial state", () => {
    const { userCertificate } = useUserCertificateStore.getState();
    expect(userCertificate).toStrictEqual(userSkillArrayMock);
  });
  test("setTempSummary action", () => {
    expect(useUserCertificateStore.getState().userCertificate).toStrictEqual(
      userSkillArrayMock,
    );
  });

  // test("update skill works correctly", () => {
  //   act(() => {
  //     updateUserSkill(userSkillArrayUpdateMock);
  //   });
  //   expect(useUserCertificateStore.getState().userSkill).toStrictEqual([
  //     userSkillUpdateMock,
  //   ]);
  //   // update skill whose id is not present in store
  //   act(() => {
  //     updateUserSkill([userSkillNoSkillId]);
  //   });
  //   expect(useUserCertificateStore.getState().userSkill).toStrictEqual([
  //     userSkillUpdateMock,
  //   ]);
  //   act(() => {
  //     updateUserSkill([]);
  //   });
  //   expect(useUserCertificateStore.getState().userSkill).toStrictEqual([
  //     userSkillUpdateMock,
  //   ]);
  // });
  test("delete skill works correctly", () => {
    act(() => {
      deleteUserCertificate("cert456");
    });
    expect(useUserCertificateStore.getState().userCertificate).toStrictEqual(
      [],
    );
    // deleting on empty array
    act(() => {
      deleteUserCertificate("cert456");
    });
    expect(useUserCertificateStore.getState().userCertificate).toStrictEqual(
      [],
    );
  });
  test("setselectedid works correctly", () => {
    act(() => {
      setIdSelected("");
    });
    expect(useUserCertificateStore.getState().idSelected).toStrictEqual("");
  });
  // keep this test at end
  test("setTempSummary action for null", () => {
    act(() => {
      setUserCertificate(null);
    });
    expect(useUserCertificateStore.getState().userCertificate).toStrictEqual([
      null,
    ]);
  });
});
