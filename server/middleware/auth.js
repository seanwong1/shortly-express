const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  console.log('shortlyid', req.cookies.shortlyid);
  console.log('cookies', req.cookies);
 // console.log('req', req);


  Promise.resolve(req.cookies.shortlyid)
    .then((session) => {
      return models.Sessions.get({session});
    })
    .catch(() => {
      return models.Sessions.create()
        .then((createdSession) => {
          console.log('logged createdSession: ', createdSession);
          var cookieObj = {shortlyid: createdSession};
          res.cookie(cookieObj);
        });
    })
    .then(() =>{
      // store the session in req.session
      next();
    });


  // if (Object.keys(req.cookies).length === 0) {
  //   return models.Sessions.create()
  //     .then((session) => {
  //       req.session = session;
  //       next();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

