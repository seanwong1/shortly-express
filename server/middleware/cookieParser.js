const parseCookies = (req, res, next) => {
  var cookies = req.headers.cookie;
  var cookieObj = {};
  if (cookies) {
    cookies = cookies.split('; ');
    cookies = cookies.map(cookie => cookie.split('='));
    for (var i = 0; i < cookies.length; i++) {
      cookieObj[cookies[i][0]] = cookies[i][1];
    }
  }
  req.cookies = cookieObj;
  next();
  res.end();
};

module.exports = parseCookies;