import { usersTable } from "./../db/schema";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { SanatizeData } from "../utils/SanatizeData";

interface DataObject {
   name: string;
   email: string;
   password: string;
   role?: string;
}

const userService = {
   async signin(data: DataObject) {
      const { name, email, password, role } = data;
      const userData = new SanatizeData(name, email, password, role);

      const user = {
         name: name,
         email: userData.getEmail(),
         password: await userData.hashPassword(),
         role: role === 'admin' ? 'admin' : ('user' as 'user' | 'admin'),
      };

      const existingUser = await db
         .select()
         .from(usersTable)
         .where(eq(usersTable.email, user.email))
         .limit(1);

      if (existingUser.length > 0) {
         return { 
            success: false, 
            status: 409, 
            message: "User already exists" 
         };
      }

      await db.insert(usersTable).values(user).execute();

      return { 
         success: true, 
         status: 201, 
         message: "User signed up successfully", 
         data: { name, email } 
      };
   },
};

export { userService };