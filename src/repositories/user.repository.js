import db from "../config/db.js";

export const userRepository = {
    async getUserByEmail(email){
        try {
            const query = "select * from users where email=$1;"
            const result = await db.query(query, [email])
            return result.rows[0]
        } catch (error) {
            throw new Error("Error in conection database.")
        }
    }
}