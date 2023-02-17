import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../errors";
import { UserWithOutPassword } from "../../interfaces/users.interfaces";
import { returnUserSchemaWithOutPassword } from "../../schemas/users.schemas";

const changeUserService = async (
  userId: number,
  userData: string
): Promise<UserWithOutPassword> => {
  const queryStringUserExist: string = `
  SELECT
      *
  FROM
      users
  WHERE
      id = $1
`;

  const queryConfigExists: QueryConfig = {
    text: queryStringUserExist,
    values: [userId],
  };
  const queryResultExist: QueryResult = await client.query(queryConfigExists);

  if (queryResultExist.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  const updateKeys = Object.keys(userData);
  const updateValues = Object.values(userData);
  const formatString: string = format(
    `
        UPDATE
            users
        SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING *;
       `,
    updateKeys,
    updateValues
  );

  const queryConfig: QueryConfig = {
    text: formatString,
    values: [userId],
  };

  const queryNewResult: QueryResult = await client.query(queryConfig);
  return returnUserSchemaWithOutPassword.parse(queryNewResult.rows[0]);
};

export default changeUserService;
