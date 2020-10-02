
## General

 Explain what this project does
This project is bid2buy app where 

- User Can Login / Signup
- User Can Add New Items
- User Can Change Status of Items To Sold On his products
- User Can Bid on other users product
  

### Explain how its structured
    |__ src
        |__ client
        |__ Server
    |__ tests
        |__ client
        |__ Server

above is the main heirarachy of my project , client side code is available in src/client and server side code is avaialble in src/server. Both of these folders have test folders in test directory which are responsible for handeling Testing using Jest.


* How its implemented, what different technologies were used
    Nodejs is used as backend and Reactjs is used on frontend. there are couple of helper libraries
        passport : to handle user authentication
        sinon: to track function invokations during testing


## To install Dependencies
```
yarn install
```
## To run the Project 
```
yarn dev
```


## To Test the Project
```
yarn test
```

## Server port 
```
 http://localhost:8080/
```



# Login User
```javascript
Content-Type: application/json

 {
    "email":"admin",
    "password":"admin"
}
```


#  API Endpoints 

| URL                              | Method | Details                              | Body / Headers                                            |
| -------------------------------- | ------ | ------------------------------------ | --------------------------------------------------------- |
| /api/items                       | GET    | Retrieves All Items                  |
| /api/item/```:id```              | GET    | Retrieves Single by ```id```         |
| /api/user                        | GET    | Retrieves All Item of Logged In User | ,      ```Valid Session```                                |
| /api/signup                      | POST   | Registers an account                 | ```username```, ```password```                            |
| /api/login                       | POST   | Signin a User                        | ```username```, ```password```                            |
|                                  |
| /api/add/item                    | POST   | Add a Product                        | ```title```, ```description``` ```price``` ```imageUrl``` |
| /api/bidding/```:id```/```bid``` | PATCH  | Add a BID                            |                                                           |
| /api/user/item/```:id```         | PATCH  | Change BID Status                    | ```status```                                              |




## Requirement Completed

**R1**:  requirements
 * [x] Write a homepage with React. 
 
 * [x] At least 2 other React pages that can be accessed via React-Router 
 
 * [x] At least one page should have some "state", whose change should be triggered from the GUI 
      (i.e., there should be some actions for which a React component should be re rendered and produce different HTML)
      
 * [x] From each page, it should be possible to go back to the homepage without having to use the “Back” button in the browser.
       In other words, do not have pages in which, once reached, it is not possible to navigate out of them. Example: if you are displaying a list of items, and then you have a link to a page to display the details of a specific item, then from such page there should be a link back (or at least to the homepage).. 
 
**R2**:  requirements 
 * [x]  Create a RESTful API handling at least one GET, one POST, one PUT and one DELETE (besides the ones for authentication/authorization of users),
        using JSON as data transfer format. Note: you **MUST** have those endpoints even if they are not used by the frontend. 
 
 * [x] The REST API **MUST** follow the best practices for API design (e.g., on the naming conventions of the endpoints).
 
 * [x] The frontend **MUST** use such API (e.g., using fetch). 
 * [x] Each endpoint MUST be listed in the “readme.md” file.


      
**R3**:  requirements 
 * [x] You need to handle authentication/authorization, which **MUST** be session-based via cookies. 
 
 * [x] In the frontend, provide a page to login. Whether to also provide a signup page (or already existing users in the fake-database) will depend on the application topic. 
 
 * [x] A logged-in user should get displayed a welcome message

**R4**: requirements 
 * [x] Each **REST** endpoint **MUST** handle authentication (401), and possibly authorization (403) checks. If an endpoint is supposed to be “open” to everyone, explicitly add a code-comment for it in its Express handler
 
 * [x] At least 2 other React pages that can be accessed via React-Router 
 

## Testing

You must write test cases for both the frontend (e.g., React components) and the backend (e.g., REST API and WebSockets) in your app. Which tests and how many you should write is up to,but there are requirements on code coverage. 
Your tests need to be written with Jest (using extra supporting libraries like Enzyme and SuperTest). 
Coverage should be calculated over **ALL** your source files in the src folder.
In the readme.md file, you **MUST** report the value for “% Stmts” of the “All files” entry when running “yarn test”. Note that an examiner will run such command, and verify that what you wrote in the readme.md does match it. 
When calculating coverage,it might be that some files have 0% coverage, whereas others have 100%.
What is important is the average value given by the “All files” entry.

Test coverage requirements:

* [x] Grade **E**: at least 10%.
* [x] Grade **D**: at least 30%.
* [x] Grade **C**: at least 50%.
* [ ] Grade **B**: at least 70%.
* [ ] Grade **A**: at least 80%.


## Application Topic

The application topic varies each year. 
This is the part of the exam text that will be different in the actual exam that you will take.
All the previous text will be nearly the same (apart from fixing typos and minor clarifications).
Note that here there might be some required technologies not mentioned in those previous requirements.
For example, the use or not of WebSockets depends on the type of application.

Requirements:

* [x] **T1** (grade E): A visitor of the page should be able to see all the current items on sale, with starting price, and what is the highest bid so far on each of the items. Add GUI to be able to create new items to sell (description plus starting price), and GUI to be able to bid on such items. 


* [x] **T2** (grade E): When the application starts in development mode, you must have some existing
fake/test data representing at least two items with and without bids. Note: if you fail to setup the
REST API (requirement for grade D), then hardcode those in the frontend.

* [x] **T3**(Grade D): the GUI must use the REST API in the backend to create new items and bids (but no
auth yet, as that is for C grade).

* [x] **T4** (Grade C): A user should be able to create a new account, login/logout, and register new items
to sell. A logged-in user should be able to bid on existing items, but not on his/her own (if s/he
tries, must get a 403 error code). Should be able to mark an item as “sold”: should still be displayed
in the webpage, with a clear message, and no other user should be able to add new bids on it.

