import express, { Request, Response } from 'express';

// Create an instance of Express
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Define a route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});