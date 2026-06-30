const { verify } = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
/* 
        1. ambil token dari headers
        2. check type dan token 
        3. verify dan decode token
        4. return login info (user)
        5. check apakah user ada di db
*/

const authentication = async (req) => {
  const token = req.headers.authorization || "";

  if (!token) {
    throw new Error("Please login first");
  }

  const [type, accessToken] = token.split(" ");

  if (type !== "Bearer" || !accessToken) {
    throw new Error("Please login first");
  }
  const decoded = verify(accessToken, process.env.JWT_SECRET);

  const user = await UserModel.findById(decoded._id);
  
  if (!user) {
    throw new Error("Please login first");
  }

  return user;
};

module.exports = authentication;
