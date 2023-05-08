## Data-Validation -Login/Register users in a secure way http request
This project is a backend Express.js application that provides two routes, **user** and **movies**, with **GET, PUT, DELETE**, and **POST** methods. The project also includes data validation using Joi, authorization with JWT (JSON Web Token), connecting to a MySQL database using mysql2, and password hashing with Argon2.

### Getting Started
To run this project run the following command in your terminal 
```bash
npm start
``` 
#### Prerequisites
To run this project, you will need to have `Node.js` installed on your machine, and you must create a database in MySQL and provide your credentials in the **`.env`** file.

#### Installing
1. Clone this repository to your local machine
2. Install the dependencies by running the following command in your terminal.
```bash
npm install
```
3. Once installed, run the following command in your terminal
```bash
npm start
```
4. Open a web browser and go to http://localhost:5000 to view the app.

### Technologies Used

- Express.js - Web framework for Node.js
- Joi - Data validation library
- jsonwebtoken - JSON Web Token library
- mysql2 - MySQL library
- argon2 - Password hashing library
- dotenv


### Routes
#### /users
- GET: Get a list of all users
- GET/:id Get only one movie
- POST: Create a new user
- PUT: Update an existing user
- DELETE: Delete an existing user

#### /users/login
- POST: login (using jwt token)

#### /users/register
- POST: using validation, hased password 

#### /users/update/:id 
- PUT: update the user from /users/register

#### /movies
- GET: Get a list of all movies
- GET/:id Get only one movie
- POST: Create a new movie
- PUT: Update an existing movie
- DELETE: Delete an existing movie


### Data Validation
Data validation is performed using the ``Joi library``. The following validation rules are applied:

#### User:
- firstname: required, string,
- lastname: required, string,
- email :required email format
- hashedPassword: required, string, at least 4  characters long,r equires the string value to only contain a-z, A-Z, and 0-9.
- city: string ,at least 2  characters long and max 20
- language:  string ,at least 4  characters long

#### Movie:
- title: required, string, at least 3  characters long and max 20
- director: required, string, max 20 characters long
- year: required, number, required year greater than 1999
- color: required: boolean
- duration: required, number greater than 60

### Authorization
Authorization is performed using ```JWT (JSON Web Token)```. The user's credentials are verified and a token is generated on successful authentication. This token is then used to authenticate future requests to protected routes.

### Database
The project connects to a MySQL database using the ```mysql2``` library. The following database schema is used:
##### User:
- firstname: primary key, auto-increment
- lastname: string
- email: string unique 
- hashedPassword: string 
- city string
- language string

##### Movie:
- id: primary key, auto-increment
- title: string
- director: string
- year: number
- color: boolean
- duration string


### Password Hashing
Passwords are hashed using the Argon2 library. The hashed password is stored in the database to ensure security.



### Contributing

Contributions to this project are welcome. To contribute, follow these steps:

1. Fork this repository.
2. Create your own branch: `git checkout -b <branch_name>`
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request
