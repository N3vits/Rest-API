import { Router } from "express";
import { check } from "express-validator";

import { login, register } from "../controllers/auth.controller.js";
import { validateFields } from "../middlewares/validateFields.js";
import { checkEmail } from "../helpers/validations.js";

export const router = Router();

router.post(
  "/login",
  [
    check("email").isEmail(),
    check("password", "Incorrect password").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/register",
  [
    check("name", "User name required").not().isEmpty(),
    check("email").isEmail(),
    check("email").custom(checkEmail),
    check("password", "Incorrect password").not().isEmpty(),
    check("password", "The minimum length must be 6").isLength({ min: 6 }),
    validateFields,
  ],
  register
);
