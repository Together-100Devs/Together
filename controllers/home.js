module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  ping: (req, res) => {
    return res.json({message: 'pong'})
  },
};
