import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.Authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;
    //handle custom token
    if (token && isCustomAuth) {
      //verify the token
      decodedData = jwt.verify(token, process.env.JWTSECRET);

      req.userId = decodedData?.id;
    } else {
      //handle google token
      decodedData = jwt.decode(token);
      // Sub is a unique id that Google uses that we can use to differentiate users with.
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
