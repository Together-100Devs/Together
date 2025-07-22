const DiscordStrategy = require("passport-discord").Strategy;
const User = require("../models/User");

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });

  // Conditionally require & execute the mocking module as `nock` is not installed in production
  if (process.env.NODE_ENV === "test")
    require("../test/passport-discord-mocking")();

  //Discord authentication
  passport.use(
    new DiscordStrategy(
      {
        //Get client ID and Secret from discord developer portal
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: "/api/auth/discord/callback",
        // pulls discord username without email, and returns basic information about all the user's current guilds / servers.
        scope: ["identify", "guilds", "guilds.members.read"],
        passReqToCallback: true,
      },
      async function (currentReq, accessToken, refreshToken, profile, cb) {
        let displayName = profile.global_name ?? profile.username;

        const is100Dever = profile.guilds.some(
          (server) => server.id === "735923219315425401"
        );

        if (!is100Dever) {
          currentReq.session.isNot100Dever = true;
          return cb(null, false);
        }
        // Check if user exists in DB
        let user = await User.findOne({ discordId: profile.id }).exec();

        // check to see if there is a .nick property in the current user's guild
        const serverName = await getServerName(accessToken);

        //if there is a serverName, use that instead of username or global_name
        if (serverName) displayName = serverName;

        try {
          // Create user if it doesn't exist
          if (!user) {
            user = await User.create({
              displayName: displayName,
              discordId: profile.id,
              avatar: profile.avatar,
              isModerator: false,
              socials: [],
              bio: "",
              needsToBeWelcome: true,
            });

            return cb(null, user);
          } else {
            // if user already exists, update display name and avatar
            user.displayName = displayName;
            user.avatar = profile.avatar;
            const updatedUser = await user.save();

            return cb(null, updatedUser);
          }
        } catch (err) {
          // do something with error
          console.log(err);
          return cb(err, false);
        }
      }
    )
  );
};

/**
 * a function that gets a user's server name.
 * @param {string} accessToken represents the current access token of the auth instance
 */
async function getServerName(accessToken) {
  //if in the parameters, can be reusable + testable
  //test the happy path
  try {
    const devMemberInfo = await fetch(
      "https://discord.com/api/users/@me/guilds/735923219315425401/member",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const devMemberData = await devMemberInfo.json();
    //return a 200, something that is jsonable
    //if .nick, that indicates a nickname
    if (devMemberData.nick) {
      return devMemberData.nick;
    }
    //if 500, return the response, server name
    //if no .nick, return serverName
  } catch (error) {
    console.log(`User guild name could not be found with the error: ${error}`);
  }
  return null;
}

module.exports.getServerName = getServerName;
