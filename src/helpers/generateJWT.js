import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv"


const jwt = jsonwebtoken;
dotenv.config();

export const generateJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.SECRETPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("JWT could not be generated");
        } else {
          resolve(token);
        }
      }
    );
  });
};