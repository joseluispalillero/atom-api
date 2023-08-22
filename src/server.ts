// server.ts
import app from './app';
import { config } from "./config";

app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`);
});