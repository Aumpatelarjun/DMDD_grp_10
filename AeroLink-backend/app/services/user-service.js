import executeQuery from '../db.js';

// getUser is a helper service function
export const getUser = async (id) => {
    try {
        const query = `SELECT * FROM Account where Account_ID = ${id}`;
        const result = await executeQuery(query); // Await the execution of the query
        console.log('Query result:', result);
        return result; // Return the result if needed
    } catch (error) {
        console.error('Error:', error);
        throw error; // Throw the error to propagate it if needed
    }
};
