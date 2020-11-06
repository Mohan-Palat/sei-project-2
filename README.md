# SEI Project 2: Adopt-A-Dog

# Technical Details
## Description
Adopt-A-Dog is a web application used for finding local dogs up for adoption. Users enter their zip codes, and using an API, we're able to track dogs available for adoption nearby. Users can keep a list of their favorite dogs, view contact information for rescue shelters, and search for dogs with specific criteria.

## Project Links
- [Github Link](https://github.com/angelinejacob/sei-project-2)
- [Heroku App](https://angeline-project2.herokuapp.com/)

## Wireframes

To view my a rough draft of my website design click the following links:
1. [Login Screen](https://github.com/angelinejacob/sei-project-2/blob/main/SEI-Project2-Wireframe%20-%20Login%20Screen.pdf) - Shows the login and registration page and how they both lead to the main page/ landing page of the application
2. [Main Page](https://github.com/angelinejacob/sei-project-2/blob/main/SEI-Project2-MainScreen.pdf) - the main page includes a header, footer, nav bar, and main section. When links are clicked in the nav bar, the contents appear in the main section

## Technologies/ Tools Used
1. Node JS - Server side logic
2. MongoDB - Database
3. Heroku - Deployment

## Libraries Used
1. Axios - used to make API calls to Petfinder API
2. EJS - used to utilize MVC Architecture
3. Bcrypt - used for login auth
4. dotenv - used to set application environment variables for DB and API
5. Express - the web framework
6. method-override - to override methods
7. Mongoose - abstraction for MongoDB database
8. Express-ejs-layouts - used to implement functionality for main page, I needed a base layout for the application

---
# Project Management
## User Stories for MVP
1. As a User, I should be able to create an account
2. As a User, I should be able to login to my account
3. As a User, I should be able to read my account details
4. As a user, I should be able to edit my account details
5. As a user, I should be able to delete my account
6. As a user, I should be able to search for dogs close to my location
7. As a user, I should be able to search for dogs with a specific Criteria
8. As a user, I should be able to keep a list of my favorite dogs
9. As a user, I should be able to remove dogs from my list of favorites
10. As a user, I should be able to view details of a specific dog, including contact details for a shelter
11. As a user, I should be able to see how many other users are interested in a dog

## Future Goals
- ability to edit username and password
- pagination when loading results from API
- include google maps to see how far away a puppy is
- include better styling
- include a way to contact rescue shelter from the application
- include the pictures of the dogs

## Current Issues
- after editing a user, instead of going to main page, it should go back to user show page - just need to adjust the route
- adding to favoredDogs list is buggy (sometimes a dog wont be added), need to fix this bug
- currently the API token expires every hour, I need to find a way to automatically get a new one every 50 minutes
---
# Development Details
## Development Cycle

| Component           | Priority | Time |
|---------------------|----------|------|
| Design              | H        | 8hrs |
| Figure out API      | H        | 2hrs |
| All routes for user | H        | 8hrs |
| all routes for dogs | H        | 8hrs |
| Styling             | L        | 3hrs |
| Deployment          | M        | 4hrs |
| Testing             | H        | 3hrs |  


1. **Design** -  I spent the whole day figuring out the DB models I want to use, the wireframes, and the routes for my different models. I took the time to strategically pick 10 user stories that would be challenging, yet achievable.
2. **API** - Needed to get the auth token for the API, test it, and meddle around with request parameters, and response data
3. **User Model Routes** - The user model has all 7 restful routes
4. **Dog Model Routes** - The dog model does not have all 7 restful routes, but it does plenty of logic. One example, before inserting to DB, it checks for duplicates.
5. **Styling** - I primarily used the Bootsrap library to style my components, I used plenty of forms, navs, and cards
6. **Deployment** - This time represents the time it took to setup Heroku, Atlas, connect everything together, and deploy through some minor bugs
7. **Testing** - Testing was done throughout the course of the week

## Mongo DB Models
### User
- username
- password
- Name
- ZipCode - user will have to enter their current zipcode, this will be used to return dogs, near them
- Favorite Dogs - list of favorite dogs as selected by user, this will just store Mongo DB object Ids. I will be using referenced mongoose associations
### Dog
- animalId - unique for each dog in the API, this is used specifically to get information on an individual dog from the api
- name
- breed
- color
- age
- gender
- size
- interestedOwners - the number of users interested in adopting this dog
- Rescue shelter contact info (not an embedded document, rather individual fields on the dog object)
    - email
    - phone
    - street
    - city
    - state
    - postcode
    - country

## API Used
1. [Petfinder API](https://www.petfinder.com/developers/)

## Favorite Features
**Interested Owners Counter** - My favorite feature of the application is the Interested Owners counter. Every user will be able to see how many total users are interested in adopting a particular dog. This feature can be found in the dogsController.js file. Everytime a user adds a Dog to their list of favorite dogs, the counter goes up, and everytime they remove a dog, the counter goes down. Though it is a simple feature, being new at this, it took me a while to figure it out. It involved a lot of meddling with mongoose.populate() and .save() functions

---
