# SEI Project 2
## User Stories
1. As a User, I should be able to create an account
2. As a User, I should be able to login to my account
3. As a user, I should be able to edit my account details
4. As a user, I should be able to delete my account
5. As a user, I should be able to search for dogs close to my location
6. As a user, I should be able to search for dogs with a specific Criteria
7. As a user, I should be able to keep a list of my favorite dogs
8. As a user, I should be able to remove dogs from my list of favorites
9. As a user, I should be able to view details of a specific dog, including contact details for a shelter
10. As a user, I should be able to keep a track of my dog search
11. As a user, I should be able to see how many other users are interested in a dog
---
## Models
### User
- username
- password
- Name
- Location - user will have to enter their current location
- Favorite Dogs - list of favorite dogs as selected by user, this will just store Mongo DB object Ids. I will be using referenced mongoose associations
### Dog
- animal ID 
- name
- breed
- color
- age
- gender
- size
- spayed/neutered
- house trained
- characteristics ("Cute","Intelligent","Large","Playful","Happy","Affectionate")
- description (sentence describing the dog)
- interested owners: this would be a number of people interested in adopting this particular dog
- **might include a field to determine if the dog works well with Children and other pets**

---
## Wireframes

To view my a rough draft of my website design click the following links:
1. [Login Screen](https://github.com/angelinejacob/sei-project-2/blob/main/SEI-Project2-Wireframe%20-%20Login%20Screen.pdf)
2. [Main Page](https://github.com/angelinejacob/sei-project-2/blob/main/SEI-Project2-MainScreen.pdf)