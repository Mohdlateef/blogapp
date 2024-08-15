const userValidation = ({ email, username, password }) => {
  return new Promise((resolve, reject) => {
    if (!email || !username || !password) {
      console.log("email");
      reject("missing cradential's");
    } else if (typeof email != "string") {
      reject("Email should be string format");
    } else if (typeof password != "string") {
      reject("password should be string format");
    } else if (typeof username != "string") {
      reject("user name shoud be string format");
    }
    resolve();
  });
};

module.exports = { userValidation };
