"use strict";

// Assuming your passport config file is two directories up in /config
const { getServerName } = require("../../config/passport");

describe("getServerName", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // restore all mocks after each test
    jest.restoreAllMocks();
    global.fetch.mockClear();
  });

  /* given nick property, return the nick property */

  it("nickname is present", async () => {
    // define the mock response for this specific test case
    const mockApiResponse = {
      nick: "notLegmother",
      user: { id: "123", username: "discord-user" },
    };

    // resolve with an object that has a .json() method,
    // which in turn resolves with our mock API response.
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    // call the function, expect it to be the nickname
    const result = await getServerName("fake-token");
    console.log(result);
    expect(result).toBe("notLegmother");
  });

  //test the cases in which it goes wrong, i.e. no nick property
  //capture the user behavior rather than the specific output
  it("nickname is not present", async () => {
    const mockApiResponse = {
      user: { id: "123", username: "discord-user" },
    };

    // resolve with an object that has a .json() method,
    // which in turn resolves with our mock API response.
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    // what is logging? check on that
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const result = await getServerName("fake-token");

    // assertions: return null and the expected log message
    expect(result).toBe(null); // The function should return null
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "The nickname could not be found."
    );
  });

  //server / API error
  it("returns no data", async () => {
    const mockApiResponse = {
      status: 400,
      statusText: "Bad Request",
    };

    // resolve with an object that has a .json() method,
    // which in turn resolves with our mock API response.
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    // what is logging? check on that
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const result = await getServerName("fake-token");

    // assertions: return null and the expected log message
    expect(result).toBe(null); // The function should return null
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "The nickname could not be found."
    );
  });
});
