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
        // console.log('Scopes:', currentReq);

        let displayName = profile.global_name ?? profile.username;

        const is100Dever = profile.guilds.some(
          (server) => server.id === "735923219315425401"
        );

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
          // console.log(devMemberData.nick, devMemberData.user)
          if (devMemberData.nick) {
            displayName = devMemberData.nick;
          } else if (profile.discriminator.length === 4) {
            displayName = `${profile.username}#${profile.discriminator}`;
          } else {
            displayName = user.global_name || user.username;
          }
        } catch (error) {
          console.log(error);
          console.log("User guild name could not be found.");
        }

        const guildMember = profile.guilds.find(
          (g) => g.id === "735923219315425401"
        );
        const guildDisplayName = guildMember?.nick || profile.username;

        console.log(guildDisplayName);

        if (!is100Dever) {
          currentReq.session.isNot100Dever = true;
          return cb(null, false);
        }
        // Check if user exists in DB
        let user = await User.findOne({ discordId: profile.id }).exec();

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
