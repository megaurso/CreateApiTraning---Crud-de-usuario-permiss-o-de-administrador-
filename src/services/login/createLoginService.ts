import { QueryConfig } from "pg";
import { LoginRequest } from "../../interfaces/login.interfaces";
import { client } from "../../database";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import { UserResultWithPassword } from "../../interfaces/users.interfaces";
import jwt from "jsonwebtoken";

const createLoginService = async (loginData: LoginRequest): Promise<string> => {
  const queryString = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [loginData.email],
  };

  const queryResult: UserResultWithPassword = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const matchPassword: boolean = await compare(
    loginData.password,
    queryResult.rows[0].password
  );
  if (!matchPassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      role: queryResult.rows[0].admin,
    },
    process.env.SRECET_KEY!,
    {
      expiresIn: "24h",
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};

export default createLoginService;
