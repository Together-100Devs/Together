module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getAdd: (req, res) => {
    res.render("add_event.ejs");
  },
};
