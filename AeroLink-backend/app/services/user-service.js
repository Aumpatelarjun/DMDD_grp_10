import executeQuery from "../db.js";
import bcrypt from "bcrypt";
const salt = 10;
// getUser is a helper service function
export const getUser = async (id) => {
  try {
    const query = `SELECT * FROM Account where Account_ID = ${id}`;
    const result = await executeQuery(query); // Await the execution of the query
    console.log("Query result:", result);
    return result; // Return the result if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Throw the error to propagate it if needed
  }
};
export async function registerUser(username, password, email) {
  // const hashedPassword = hashPassword(password); // Assume this function hashes the password
  const hashedPassword = await bcrypt.hash(password, salt);
  const query = `INSERT INTO Account (Username, User_Password, Email_ID) VALUES (${username}, ${hashedPassword}, ${email})`;
  const result = await executeQuery(query);
  return { username, email };
}

// Login a user
export async function loginUser(username, password) {
  const user = await searchUserByUsername(username);
  if (user) {
    const match = await bcrypt.compare(password, user[0].User_Password);
    if (match) {
      return true;
    }
  }
  return false;
}

export async function searchUserByEmailId(emailId) {
  const query = `SELECT * FROM Account WHERE Email_ID = '${emailId}'`;
  const result = await executeQuery(query);
  return result;
}
export async function searchUserByUsername(username) {
  console.log(username, "username");
  const query = `SELECT * FROM Account WHERE Username = '${username}'`;
  const result = await executeQuery(query);
  return result;
}
