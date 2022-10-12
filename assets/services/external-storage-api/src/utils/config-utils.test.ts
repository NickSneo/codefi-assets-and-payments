import { envBool, envInt, envString } from "./config-utils";

describe("config-utils", () => {
  describe("envString", () => {
    it("get string value", () => {
      process.env.VAL = "val";

      const val = envString("VAL");
      expect(val).toEqual("val");
    });

    it("throws an error if a value is not provided", () => {
      delete process.env.VAL;

      expect(() => {
        envString("VAL");
      }).toThrowError("Environment variable VAL not defined");
    });

    it("returns a default value if provided", () => {
      delete process.env.VAL;

      const val = envString("VAL", "def");
      expect(val).toEqual("def");
    });
  });

  describe("envInt", () => {
    it("parses int value", () => {
      process.env.VAL = "123";

      const val = envInt("VAL");
      expect(val).toEqual(123);
    });

    it("throws an error if cannot parse int value", () => {
      process.env.VAL = "abc";

      expect(() => {
        envInt("VAL");
      }).toThrowError(
        "Failed to parse environment variable VAL=abc as integer"
      );
    });

    it("throws an error if a value is not provided", () => {
      delete process.env.VAL;

      expect(() => {
        envInt("VAL");
      }).toThrowError("Environment variable VAL not defined");
    });

    it("returns a default value if provided", () => {
      delete process.env.VAL;

      const val = envInt("VAL", 234);
      expect(val).toEqual(234);
    });
  });

  describe("envBool", () => {
    it("parses true boolean value", () => {
      process.env.VAL = "true";

      const val = envBool("VAL");
      expect(val).toEqual(true);
    });

    it("parses false boolean value", () => {
      process.env.VAL = "FalSe";

      const val = envBool("VAL");
      expect(val).toEqual(false);
    });

    it("throws an error if cannot parse boolean value", () => {
      process.env.VAL = "abc";

      expect(() => {
        envBool("VAL");
      }).toThrowError(
        "Failed to parse environment variable VAL=abc as boolean"
      );
    });

    it("throws an error if a value is not provided", () => {
      delete process.env.VAL;

      expect(() => {
        envBool("VAL");
      }).toThrowError("Environment variable VAL not defined");
    });

    it("returns a default value if provided", () => {
      delete process.env.VAL;

      const val = envBool("VAL", false);
      expect(val).toEqual(false);
    });
  });
});
