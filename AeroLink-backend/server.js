import express from 'express'
import initialize from './app/app.js'
import db  from "./app/db.js"; 
import executeQuery from './app/db.js';
const app = express();
const port = 8000; // You can change the port number if needed


initialize(app)
// Define a route
app.get('/', async (req, res) => {
  const result = await db.executeStatement();
  res.json(result);
  res.send('Hello, World!');
});

// async function main() {
//   try {
//       // Example query
//       const query = "SELECT * FROM Airline";
//       const result = await executeQuery(query);
//       console.log('Query result:', result);
//   } catch (error) {
//       console.error('Error:', error);
//   }
// }
// main();
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

});
