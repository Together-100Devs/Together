const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  displayName: { type: String, unique: true },
  discordId: { type: String, unique: true },
  avatar: { type: String },
  socials: [{ type: String }],
  bio: { type: String },
  needsToBeWelcome: { type: String }
});

UserSchema.virtual("avatarURL").get(function () {
  return (
    "https://cdn.discordapp.com/" +
    (this.avatar
      ? ["", `${this._id}/${this.avatar}.webp`]
      : ["embed/", `avatars/${+this.displayName.split("#").at(-1) % 5}.png`]
    ).join("avatars/")
  );
});

module.exports = mongoose.model("User", UserSchema);
