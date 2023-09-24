const ciphyr = require(".././index.js");
const context = require("./mockContext.js");
console.log(ciphyr);

describe("ciphyr.myPlugin", () => {
  describe("serverWillStart", () => {
    it("should log a message indicating Ciphyr server starting up", async () => {
      const consoleSpy = jest.spyOn(console, "log");
      await ciphyr.myPlugin.serverWillStart();
      expect(consoleSpy).toHaveBeenCalledWith("Ciphyr starting up!");
      consoleSpy.mockRestore();
    });
  });
  it("should log an error indicating Ciphyr failed to start up", async () => {
    const errorMessage = "Something went wrong during startup!";
    jest.spyOn(console, "log").mockImplementation(() => {
      throw new Error(errorMessage);
    });

    try {
      await ciphyr.myPlugin.serverWillStart();
    } catch (error) {
      expect(error.message).toContain("Error during server startup:");
      expect(error.message).toContain(errorMessage);
    }
  });
  describe("requestDidStart", () => {
    it("should call ciphyr.getStartTime and ciphyr.convertStr", async () => {
      const mockGetStartTime = jest.spyOn(ciphyr, "getStartTime");
      const mockConvertStr = jest.spyOn(ciphyr, "convertStr");

      const context = {
        userQuery: `{ user(id: "123") { id, name } }`,
      };
      // how to fire a query from Jest assuming that we have the mock - db
      
      const responseFunction = await ciphyr.myPlugin.requestDidStart(context);
      responseFunction.willSendResponse({});

      expect(mockConvertStr).toHaveBeenCalledWith({ request: { query: context.userQuery } });
      expect(mockGetStartTime).toHaveBeenCalled();
      expect(mockConvertStr).toHaveBeenCalled();

      mockGetStartTime.mockRestore();
      mockConvertStr.mockRestore();
    });
  });
});
