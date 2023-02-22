const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    /* istanbul ignore next  */
    if (process.env.NODE_ENV !== 'test') console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
