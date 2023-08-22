# Task ATOM API
This is an Express.js application that provides API endpoints for managing tasks. It allows you to perform CRUD (Create, Read, Update, Delete) operations on tasks. The API is documented using Swagger annotations.

## Installation
Clone the repository:

```bash
git clone https://github.com/joseluispalillero/atom-api.git
cd atom-api
```
Install dependencies:

```bash Copy code
npm install
```
Start the server:

``` bash Copy code
npm start
```
The server will start and listen on the specified port (default is 3000).

## API Endpoints
### Get All Tasks
Endpoint: **GET /tasks**

Retrieve a list of all tasks.

### Get Task by ID
Endpoint: **GET /tasks/{taskId}**

Retrieve a specific task by its ID.

### Create Task
Endpoint: **POST /tasks**

Create a new task by providing task details in the request body.

### Update Task
Endpoint: **PUT /tasks/{taskId}**

Update an existing task by providing task details in the request body.

### Delete Task
Endpoint: **DELETE /tasks/{taskId}**

Delete a task by its ID.

## API Documentation
The API is documented using Swagger. You can access the Swagger UI to interactively explore and test the API endpoints. The Swagger documentation can be found at:

```bash
http://localhost:3000/
```

or you can use sandbox env

```bash
https://jl-api-atom-dccfeebe3e8c.herokuapp.com/
```

Show POSTMAN Collections
```bash
https://documenter.getpostman.com/view/16679620/2s9Y5VSiGX
```
## Dependencies
- **Express.js**: Web application framework for Node.js.
- **tsyringe**: Dependency injection container for TypeScript.
- **asyncMiddleware**: Custom middleware for handling asynchronous route handlers.
- **validateTask**: Middleware for validating task data before creating or updating tasks.

## Contributing
If you'd like to contribute to this project, feel free to create a pull request. Please ensure that your code follows the existing coding style and that any new features are well-documented.

## License
This project is licensed under the MIT License.