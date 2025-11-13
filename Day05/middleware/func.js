const logger = (req, res, next) => {
  console.log(`req.url:${req.url}`);
  console.log(`req.method:${req.method}`);
  next();
};
const timeChecker = (req, res, next) => {
  console.log(new Date().toLocaleTimeString());
  next();
};

const responseFormater = (req, res, next) => {
  res.success = (data) => {
    res.json({
      success: true,
      data,
      time: new Date().toLocaleTimeString(),
    });
  };
  next();
};

module.exports = { logger, timeChecker, responseFormater };
