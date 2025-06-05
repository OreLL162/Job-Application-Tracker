export function protectedRouteHandler(req, res) {
  res.status(200).json({ msg: `Welcome, ${req.user.username}!`, user: req.user });
}