import { UserWithOutPassword } from "../../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";
import { returnUserSchemaWithOutPassword } from "../../schemas/users.schemas";

const recoverUserService = async (
  userId: number
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


  const queryString: string = `   
        UPDATE 
            users 
        SET 
            "active" = true
        WHERE 
            id = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  await client.query(queryConfig);

  if(queryResultExist.rows[0].active === true){
    throw new AppError("User already active", 400);
  };
  
  return returnUserSchemaWithOutPassword.parse(queryResultExist.rows[0]);
};

export default recoverUserService;
