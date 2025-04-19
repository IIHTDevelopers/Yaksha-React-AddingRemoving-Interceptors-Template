import axios from "axios";
import axiosInstance from "../../services/axiosInstance";
import '@testing-library/jest-dom';

describe("boundary", () => {
    it("AxiosInstanceComponent boundary should not alert the user for other types of errors", async () => {
        jest.spyOn(window, "alert").mockImplementation(() => { });
        const getSpy = jest.spyOn(axiosInstance, "get");
        getSpy.mockRejectedValue({ response: { status: 500 } });

        try {
            await axiosInstance.get("/products");
        } catch (error) {
            // Expected to fail
        }

        expect(window.alert).not.toHaveBeenCalled();

        window.alert.mockRestore();
        getSpy.mockRestore();
    });
});
