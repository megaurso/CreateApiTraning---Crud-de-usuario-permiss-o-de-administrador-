import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";

const deleteUser = async (userId: number): Promise<void> => {

    const queryStringUserExist: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1
    `

    const queryConfigExists: QueryConfig = {
        text:queryStringUserExist,
        values: [userId]
    }
    const queryResult: QueryResult = await client.query(queryConfigExists)

    if(queryResult.rowCount === 0){
        throw new AppError("User not found",404)
    }

    const queryString: string = `
        UPDATE
            users
        SET
            "active" = false
        WHERE 
            id = $1
    `

    const queryConfig: QueryConfig = {
        text:queryString,
        values: [userId]
    }

    await client.query(queryConfig)
};
export default deleteUser;
