import db from "../config/db.js";

export const authRepository = {
    async create({ name, email, password, profileUrl }) {
        try {
            const query = "INSERT INTO users (name, email, password, profile_picture) values ($1, $2, $3, $4);"
            await db.query(query, [name, email, password, profileUrl])
        } catch (error) {
            throw new Error("user not created.");
        }
    }
}