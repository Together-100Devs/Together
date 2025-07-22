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

  it("returns the nick property when present in the API response", async () => {
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
    expect(result).toBe("notLegmother");
  });

  //test the cases in which it goes wrong, i.e. no nick property
});
