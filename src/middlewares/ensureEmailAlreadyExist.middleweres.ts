import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { AppError } from "../errors";
import { client } from "../database";

const emailALreadyExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const queryStringUserExist: string = `
    SELECT 
        *
    FROM 
        users
    where 
        email = $1
`;

  const queryConfigUserExist: QueryConfig = {
    text: queryStringUserExist,
    values: [req.body.email],
  };

  const queryResultExist = await client.query(queryConfigUserExist);

  if (queryResultExist.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  return next()
};

export default emailALreadyExist