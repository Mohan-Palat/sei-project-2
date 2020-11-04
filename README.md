# SEI Project 2
## User Stories
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
---
## Models
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

---
## Wireframes

To view my a rough draft of my website design click the following links:
1. [Login Screen](https://github.com/angelinejacob/sei-project-2/blob/main/SEI-Project2-Wireframe%20-%20Login%20Screen.pdf)
2. [Main Page](https://github.com/angelinejacob/sei-project-2/blob/main/SEI-Project2-MainScreen.pdf)