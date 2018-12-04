# **To-Do List(v0):**
## Home, Navbar and Profile

## Profile and Food logging
- look into express basic auth
- require to add food on food-index (javier)
- make profile form responsive (javier)

## DONE
- connect add button to food log form
- food form template
- form creates user and routes to their profile
- Home Template
- Sign up button goes to form
- Profile Template
- Hook up Login button to user profile
- login submit button should look for username in database and re-route to /profiles/:id
- if username not found, should display error message in template
- add public folder with img, js and css subfolders
- update README
- add emissions indicator icons (javier)
- make home page image responsive (javier)
- make edit form (javier)
- cancel button on food-index and edit forms (javier)
- maybe start with a table; then graph (faith)
- make 'submit' work on food-index page (faith)
- food form submit button needs to route back to profile and update user profile (faith)
- hook up edit food button (faith)

## **To-Do List(v1):**
- associate add buttons with the day using id
- basic graph (0-100 graph)
- days need to be associated with graph
- hook up form to the data base for users to search (faith)
- make emissions indicators fully functional
- write out an ERD (paper or whiteboard)


// app.js
https://www.npmjs.com/package/helper-moment
app.locals.moment = require("helper-moment")

create model with profile id and food id
