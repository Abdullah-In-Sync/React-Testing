import { renderHook } from "@testing-library/react";
import useStorage from "../components/common/hooks/useStorage";
describe("useStorage hook testing", () => {

  it("should return getItem function", async () => {
    const {
      result: { current },
    } = renderHook(() => useStorage());

    expect(current).toHaveProperty("getItem");
  });
});
