import chalk from "chalk"
import { db } from "./db"
import { usersTable } from "./db/schema"

export const queryDb = async () => {
   const users = await db.select().from(usersTable);
    console.log(chalk.bgGreen("Queried the database"))
    console.log(users)
}

export const deleteRecords = async () => {
    await db.delete(usersTable)
    console.log(chalk.bgRed("Deleted all records"))
}

queryDb()