# **To-Do List(v0):**
## Home, Navbar and Profile

## Profile and Food logging
- look into express basic auth
- require to add food on food-index (javier)
- make profile form responsive (javier)
- make 'submit' work on food-index page (faith)
- food form submit button needs to route back to profile and update user profile (faith)
- hook up edit food button (faith)

## DONE
- connect add button to food log form (done)
- food form template (done)
- form creates user and routes to their profile (done)
- Home Template (done)
- Sign up button goes to form (done)
- Profile Template (done)
- Hook up Login button to user profile (done)
- login submit button should look for username in database and re-route to /profiles/:id (done)
- if username not found, should display error message in template (done)
- add public folder with img, js and css subfolders (done)
- update README
- add emissions indicator icons (javier)
- make home page image responsive (javier)
- make edit form (javier)
- cancel button on food-index and edit forms (javier)
- maybe start with a table; then graph (faith)

## v1
- associate add buttons with the day using id (v1)
- (stretch) basic graph (0-100 graph)
- (stretch) days need to be associated with graph (id)
- hook up form to the data base for users to search (faith)
- make emissions indicators fully functional


Profile => foods
Foods
    - name
    - eatenOn
    - co2
    - profile
    - meal: String ("breakfast, brunch, lunch, afternoon snack, dinner, after dinner snack")

Food.find().group('eatenOn');
?? group on two atrb at once?

// app.js
https://www.npmjs.com/package/helper-moment
app.locals.moment = require("helper-moment")
app.locals.servings = [
    { name: "beef", co2: 3 },
    { name: "beef", co2: 3 },
    { name: "beef", co2: 3 }
]

{{#each servings}}
    {{this.name}}
    {{this.co2}}
{{/each}}

Food.find({ profile: profile.id })


Profile => meals
meals => foods (embedded)

"/meals/:id/edit"

<input list="blah">
<datalist id="blah">
    <options value="carrot"/>
    <options value="broccoli"/>
    <options value="eggplant"/>
</datalist>

{
    foods: [FoodSchema];
}


{
    'createdAt': '',
    foods: [
        {
            _id:"lkjdsfls",_
            name:,
            co2:,
        }
    ]
}
