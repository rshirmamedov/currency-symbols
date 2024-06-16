import { renderHook, waitFor } from "@testing-library/react";
import { useData } from "./useData";

describe("useData", () => {
    const originalFetch = global.fetch;
    const originalAbortController = global.AbortController;
    const fetchMock = jest.fn();
    const AbortControllerMock = jest.fn().mockReturnValue({
        abort: jest.fn(),
    });

    beforeAll(() => {
        global.fetch = fetchMock;
        global.AbortController = AbortControllerMock;
    });

    beforeEach(() => {
        fetchMock.mockReset();
        AbortControllerMock.mockClear();
    });

    afterAll(() => {
        global.fetch = originalFetch;
        global.AbortController = originalAbortController;
    });

    it("returns initial values", async () => {
        const { result } = renderHook(() => useData("url"));

        await waitFor(() => {
            expect(result.current.loading).toBe(true);
            expect(result.current.data).toBeUndefined();
            expect(result.current.error).toBe(false);
        });
    });

    it("returns data", async () => {
        const data = [
            { amount: "387.32", updatedAt: "2086-01-26T20:17:34.432Z", currencyId: "1" },
            { amount: "629.59", updatedAt: "2084-05-25T02:54:01.769Z", currencyId: "2" },
        ];

        fetchMock.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(data),
        });

        const { result } = renderHook(() => useData("url"));

        await waitFor(() => {
            expect(result.current).toStrictEqual({
                loading: false,
                error: false,
                data,
            });
        });
    });

    it("returns error", async () => {
        fetchMock.mockResolvedValue({
            ok: false,
        });

        const { result } = renderHook(() => useData("url"));

        await waitFor(() => {
            expect(result.current).toStrictEqual({
                loading: false,
                error: true,
                data: undefined,
            });
        });
    });

    it("aborts request", async () => {
        const abortMock = jest.fn();

        AbortControllerMock.mockReturnValue({
            abort: abortMock,
        });

        const { unmount } = renderHook(() => useData("url"));

        unmount();

        expect(abortMock).toHaveBeenCalledTimes(1);
    });
});
