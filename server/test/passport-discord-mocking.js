const nock = require("nock");

const RESPONSES = {
  "100_DEVER": {
    "/oauth2/token": {
      access_token: "100_DEVER",
      token_type: "Bearer",
      expires_in: 604800,
      refresh_token: "100_DEVER",
      scope: "identify",
    },
    "/users/@me": {
      id: "1",
      username: "100Dever",
      discriminator: "0001",
    },
    "/users/@me/guilds": [
      {
        id: "1",
        name: "Test Guild",
      },
      {
        id: "735923219315425401",
        name: "Learn w/ Leon and Friends",
      },
      {
        id: "2",
        name: "Another Test Guild",
      },
    ],
  },
  SECOND_100_DEVER: {
    "/oauth2/token": {
      access_token: "SECOND_100_DEVER",
      token_type: "Bearer",
      expires_in: 604800,
      refresh_token: "SECOND_100_DEVER",
      scope: "identify",
    },
    "/users/@me": {
      id: "2",
      username: "100Dever2",
      discriminator: "0002",
    },
    "/users/@me/guilds": [
      {
        id: "735923219315425401",
        name: "Learn w/ Leon and Friends",
      },
    ],
  },
  JOHN_DOE: {
    "/oauth2/token": {
      access_token: "JOHN_DOE",
      token_type: "Bearer",
      expires_in: 604800,
      refresh_token: "JOHN_DOE",
      scope: "identify",
    },
    "/users/@me": {
      id: "3",
      username: "John Doe",
      discriminator: "0003",
    },
    "/users/@me/guilds": [],
  },
};

module.exports = function mockDiscordResponses() {
  return nock("https://discord.com/api")
    .post("/oauth2/token")
    .reply(200, (_, requestBody) => {
      const code = requestBody.match(/code=(.*)$/)[1];
      return (
        RESPONSES[code]?.["/oauth2/token"] || {
          message: "OAuth Failed",
          code: 0,
        }
      );
    })
    .get("/users/@me")
    .reply(200, function () {
      const token = this.req.headers.authorization.split(" ")[1];
      return (
        RESPONSES[token]?.["/users/@me"] || {
          message: "401: Unauthorized",
          code: 0,
        }
      );
    })
    .get("/users/@me/guilds")
    .reply(200, function () {
      const token = this.req.headers.authorization.split(" ")[1];
      return (
        RESPONSES[token]?.["/users/@me/guilds"] || {
          message: "401: Unauthorized",
          code: 0,
        }
      );
    })
    .persist();
};
