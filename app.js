import express from "express";
import users from "./data/users.js";

import { getUsers, getUserByID, createUser, updateUserByID, deleteUserByID } from "./models/users.js";

const PORT = 3000;
const app = express();

app.use(express.json());


// GET ALL USERS
//
app.get("/users", function (req,res){ //need to listen for a get request and select the path we want the info to come from. need to use a function and pass req&res. if a get request is made to this path the function should run
  const allUsers = getUsers(users) //need to the get users function and pass 'users' through it to get all users, assign the result of that to a variable which will be used in the payload to respond/display all users
  res.json({success : true, payload : allUsers }); //need to respond with all users
});

// GET A USER BY ID
app.get("/users/:id", function (req,res){ //need to listen for a get request and select the path we want the info to come from. need to use a function and pass req&res. if a get request is made to this path the function should run
  const id = Number(req.params.id); //need to provide user with specific user, therefore need to access the id/parameter stated in the path. needs to be accessed on the req object so req.params. params will store the parameter/id info. use parseInt/Number to parse string to integer. will store the result in a variable
  const specificUser = getUserByID(id) //call the function and pass the id through it and save this into a variable
  res.json({success : true, payload : specificUser }); //need to respond with specific id that user requests
});

// CREATE A USER
app.post("/users", function (req,res){//need to listen for a post request and select the path we want the info to go to. need to use a function and pass req&res. if a post request is made to this path the function should run
  const newUser = req.body; //we want to create a new user which will come from the body, then add this user to the rest of the users. the result should be assigned to a variable 
  const result = createUser(newUser) // need to call the function and pass the variable to it to which will add the new user to the rest of the users. as we will be getting something back we should store this in a variable
  res.json({success : true, payload : result }); //need to send the result as a response
});

// UPDATE A USER BY ID updateUserByID
app.put("/users/:id" , function(req,res){ //need to listen for a put request and select the path we want the info to come from. need to use a function and pass req&res. if a put request is made to this path the function should run
  const id = Number(req.params.id); //need to access the id/parameter stated in the path. needs to be accessed on the req object so req.params. params will store the parameter/id info. use parseInt/Number to parse string to integer. will store the result in a variable
  const updateUser = req.body // need to take the body from the request
  const replaceUser = updateUserByID(id, updateUser) // need to replace the user using id with the body
  res.json({success : true, payload : replaceUser}) //send a response
});

// DELETE A USER BY ID deleteUserByID
app.delete("/users/:id" , function(req,res){ //need to listen for a delete request and select the path we want the info to come from. need to use a function and pass req&res. if a delete request is made to this path the function should run
  const id = Number(req.params.id); //need to access the id/parameter stated in the path. needs to be accessed on the req object so req.params. params will store the parameter/id info. use parseInt/Number to parse string to integer. will store the result in a variable
  const deleteUser = deleteUserByID(id) //delete the user with that id
  res.json({success : true, payload : deleteUser}) //send a response

})


/* END OF ROUTES */
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});