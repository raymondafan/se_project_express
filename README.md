# WTWR (What to Wear?): Back End

In this project I am working on the basics of creating a Back End server for my Front End React weather app: "What to Wear?". To start off the project I installed express, set up a linter to find errors, installed prettier for eslinter, set up an entry point and a hot reload, and set up what port to run the express app. For the project structure, I created routes, controllers, models for the clothing items and users and a utils file for the error codes. I then crated a database by intalling Mongoose to my project and MongoDB to my computer for testing the server. I also learned to craete Schemas and Models for the users and clothing items. For these two resources I added specific schema fields like name, avatar, weather, imageUrl, etc. I also craeted routes for the user and clothing item resources. For the User routes, I used the GET methodes to return all users and to return a user by _id. I also used the POST method for createing a new user. I did something similar with Clothing Items. For instance I used GET to return all clothing items, POST for creating a new item, and DELETE for deleting items by _id. I also learned to use Postman to run tests to see if my server was working properly/sending back data correctly. throughtout the project I also learned to use middleware which are functions that modify the request and response objects, end the request-response cycle, or call the next middleware function in the stack. In these functions I also learned to handle errors for the specific methods/fields(400, 404, 500). 
## Running the Project
`npm run start` — to launch the server 

`npm run dev` — to launch the server with the hot reload feature

### Testing
Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
