const connectDB = require("./config/database");
const app = require("./app");

//Connect To Database
connectDB().then(() => {
  //Server Running
  app.listen(process.env.PORT || 2121, () => {
    console.log(
      `Server is running on ${process.env.PORT}, you better catch it!`
    );
  });
});
