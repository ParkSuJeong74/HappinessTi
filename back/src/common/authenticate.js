import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export class Authenticate {
  static hashedPassword(password) {
    const hashedPassword = bcrypt.hash(password, 10);
    const id = uuidv4();

    return { hashedPassword, id };
  }
}
