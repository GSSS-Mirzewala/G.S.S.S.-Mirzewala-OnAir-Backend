// External Modules
import bcrypt from "bcryptjs";

export function hash(password) {
  return bcrypt.hashSync(password, 12);
}

export function compare(password, hashed) {
  return bcrypt.compareSync(password, hashed);
}
