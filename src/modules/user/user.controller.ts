import User from "../../models/user.model";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { serverError } from "../../utils/error";
import { logger } from "../../helpers/logger";
import { default as bcrypt } from "bcryptjs";

// create a user class

export function createUser(req: Request, res: Response) {
  const { username, password } = req.body;
  const saltRounds = 10
  try {
    User.exists({ username })
      .then((exist) => {
        if (exist) {
          return res.status(409).json({
            message: "User already exists",
            status: 409,
          });
        } else {
          try {
            bcrypt.hash(password, saltRounds)
            .then(encrypted=>{
                const user = new User({ ...req.body, password: encrypted});
                user.save().then((newUser) => {
                  return res.status(201).json({
                    message: "Created",
                    status: 201,
                    newUser,
                  });
                });
            })
            .catch((error: Error) => {
                const err = new serverError(error.message, 501);
                return res.status(parseInt(err.statusCode)).json({
                  message: err.errMessage + ". Could not hash password",
                  status: err.statusCode,
                });
              })
          } catch (error: any) {
            const err = new serverError(error?.message ?? "Bcrypt error", 501);
            return res.status(parseInt(err.statusCode)).json({
              message: err.errMessage,
              status: err.statusCode,
            });
          }
          
        }
      })
      .catch((error: Error) => {
        return preparedError(error, res);
      });
  } catch (error: any) {
    const err = new serverError(error.message, 501);
    return res.status(parseInt(err.statusCode)).json({
      message: err.errMessage,
      status: err.statusCode,
    });
  }
  // return res.status(500).json({
  //     message: "Unknown"
  //    })
}

export function getAllUsers(req: Request, res: Response) {
  try {
    User.find({})
      .lean()
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((error: Error) => {
        // return preparedError(error, res)
        return res.status(500).json({
          message: "DB Error",
        });
      });
  } catch (error) {
    //  return preparedError(, res)
    logger.info("Server Eror");
  }

  //    return res.status(500).json({
  //     message: "Unknown"
  //    })
}

export function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;
  const SECRET = process.env.JWT_SECRET || "somesecret";
  try {
    User.findOne({ username })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (error, result) => {
            if (error) {
              return res.status(401).json({
                message: "Auth failed, Check your credentials",
                value: error,
              });
            }
            const token = jwt.sign(
              {
                active_user: user.username,
                id: user._id,
              },
              SECRET,
              {
                expiresIn: "1d",
              }
            );
            res.status(200).json({
              message: "Auth Successful",
              token,
              ACK: result,
            });
          });
        }
      })
      .catch((error: Error) => {
        const err = new serverError(error.message, 501);
        return res.status(parseInt(err.statusCode)).json({
          message: err.errMessage,
          status: err.statusCode,
        });
      });
  } catch (error: any) {
    const err = new serverError(error?.message ?? "a", 501);
    return res.status(parseInt(err.statusCode)).json({
      message: err.errMessage,
      status: err.statusCode,
    });
  }
}

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  const SECRET = process.env.JWT_SECRET || "somesecret";
  try {
    const token = req.headers["authorization"]?.split(" ")[1] ?? "invalid";
    req.body.userdata = jwt.verify(token, SECRET);
    next();
  } catch (error: any) {
    const err = new serverError(error?.message ?? "Login error", 501);
    return res.status(parseInt(err.statusCode)).json({
      message: err.errMessage,
      status: err.statusCode,
    });
  }
}

function preparedError(error: Error, res: Response): Response {
  const err = new serverError(error.message, 501);
  return res.status(parseInt(err.statusCode)).json({
    message: err.errMessage,
    status: err.statusCode,
  });
}
