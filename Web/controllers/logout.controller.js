module.exports = async (req, res, next) => {
  req.session.destroy(function(err) {return res.redirect("/AdminCP/login");});
}