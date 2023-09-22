const ciphyr = require(".././index.js");

console.log(ciphyr);

describe("ciphyr.myPlugin", () => {
  describe("serverWillStart", () => {
    it("should log a message indicating Ciphyr server starting up", async () => {
      const consoleSpy = jest.spyOn(console, "log");
      await serverWillStart();
      expect(consoleSpy).toHaveBeenCalledWith("Ciphyr starting up!");
      consoleSpy.mockRestore();
    });
  });
});
