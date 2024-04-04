import sql from "msnodesqlv8";

const connectionString = "Server=LAPTOP-LTNJ8DHV\\SQLEXPRESS;Database=AeroLink_System;Trusted_Connection=True;Driver={SQL Server}";

// Execute the query
export default function executeQuery(query) {
    return new Promise((resolve, reject) => {
        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                console.error("Error executing query:", err);
                reject(err); // Reject the promise with the error
            } else {
                // Log the rows retrieved from the database
                console.log(rows);
                resolve(rows); // Resolve the promise with the rows retrieved from the database
            }
        });
    });
}
