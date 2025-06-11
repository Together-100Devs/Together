"use strict";

const crypto = require("node:crypto");
const { createEventsArray } = require("../../utilities/createEventsArray");
const {
  generateTestCases,
  WETnonrecurring,
  WESTnonrecurring,
  WETtoWESTnonrecurring,
  WETtoWESTrecurring,
  WESTtoWETnonrecurring,
  WESTtoWETrecurring,
  PSTnonrecurring,
  PDTnonrecurring,
  PSTtoPDTnonrecurring,
  PSTtoPDTrecurring,
  PDTtoPSTnonrecurring,
  PDTtoPSTrecurring,
} = require("./createEventsArrayMockData");

jest.mock("node:crypto", () => ({
  randomUUID: jest.fn(),
}));
const mockedCrypto = jest.mocked(crypto);

describe("Events created in Western European Time (WET) and Western European Summer Time (WEST)", () => {
  describe("WET - WEST non recurring", () => {
    test.each([
      ...generateTestCases(WETnonrecurring),
      ...generateTestCases(WESTnonrecurring),
      ...generateTestCases(WETtoWESTnonrecurring),
      ...generateTestCases(WESTtoWETnonrecurring),
    ])("$description", ({ input, output }) => {
      const res = createEventsArray(input);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(1);
      expect(res).toEqual(output);
    });
  });

  describe("WET - WEST recurring", () => {
    test.each([
      ...generateTestCases(WETtoWESTrecurring),
      ...generateTestCases(WESTtoWETrecurring),
    ])("$description", ({ input, output }) => {
      mockedCrypto.randomUUID.mockReturnValueOnce("1234");
      const res = createEventsArray(input);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(3);
      expect(res).toEqual(output);
    });
  });
});

describe("Events created in Pacific Standard Time (PST) and Pacific Daylight Time (PDT)", () => {
  describe("PST - PDT non recurring", () => {
    test.each([
      ...generateTestCases(PSTnonrecurring),
      ...generateTestCases(PDTnonrecurring),
      ...generateTestCases(PSTtoPDTnonrecurring),
      ...generateTestCases(PDTtoPSTnonrecurring),
    ])("$description", ({ input, output }) => {
      const res = createEventsArray(input);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(1);
      expect(res).toEqual(output);
    });
  });

  describe("PST - PDT recurring", () => {
    test.each([
      ...generateTestCases(PSTtoPDTrecurring),
      ...generateTestCases(PDTtoPSTrecurring),
    ])("$description", ({ input, output }) => {
      mockedCrypto.randomUUID.mockReturnValueOnce("1234");
      const res = createEventsArray(input);
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(3);
      expect(res).toEqual(output);
    });
  });
});
