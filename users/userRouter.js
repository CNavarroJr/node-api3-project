const express = require('express');
const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();


//-----------------------------------------------//
// POST /API/USERS
router.post('/', validateUser, (req, res) => {
  //This will create a new post. Using validateUser below will throw error if missing body.
  res.status(201).json(req.body);
});

//-----------------------------------------------//
// POST /API/USERS/ID/POSTS
router.post('/:id/posts', (req, res) => {
  res.status(201).json(req.body)
});

//-----------------------------------------------//
// GET /API/USERS
router.get('/', (req, res) => {
  Users.get().then((data) => {

    if  (data.length === 0) {
      res.status(404).json({message: "There were no users found."})
    } else {
      res.status(200).json(data)
    }
  });
});

//-----------------------------------------------//
// GET /API/USERS/ID
router.get('/:id', validateUserId, (req, res) => {
  // Will return a user with specified id
  res.status(200).json(req.user);
});

//-----------------------------------------------//
// GET /API/USERS/ID/POSTS
router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((data) => {
      res.status(500).json({ error: "Something went wrong" })
    })
});

//-----------------------------------------------//
// DELETE /API/USERS
router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({ message: "User does not exist" })
      } else {
        res.status(200).json("User has been deleted")
      }
    })
    .catch(data => {
      res.status(500).json({error: "Something went wrong."})
    })
});

//-----------------------------------------------//
// PUT /API/USERS
router.put('/:id', validateUserId, (req, res) => {
  if(!req.body.name) {
    res.status(400).json({message: "Missing required name field"});
  } else {
    Users.update(req.user.id, req.body)
      .then(data => {
        Users.getById(req.params.id)
          .then(user => {
            res.status(200).json(user)
          })
      })
      .catch(data => {
        res.status(500).json({error: "Something went wrong"})
      })
  }
});

//CUSTOM MIDDLEWARE. TO BE USED IN ROUTES
// 2. validateUserId
function validateUserId(req, res, next) {
  Users.getById(req.params.id)
  .then((data) => {
    if (!data) {
      res.status(400).json({ message: "Invalid user id" })
    } else {
      req.user = data;
    }
    next();
  })
  .catch((data) => res.status(500).json({ error: "Something went wrong"}));
  //IN Postman run ----  GET localhost:4000/api/users/1
}

//CUSTOM MIDDLEWARE. TO BE USED IN ROUTES
// 2. validateUser
function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing user data" })
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field" })
  } else {
    Users.insert(req.body)
      .then((data) => {
        req.body = data;
        next();
      })
      .catch((data) => {
        res.status(500).json({ error: "Something went wrong" })
      });
  }
}

//CUSTOM MIDDLEWARE. TO BE USED IN ROUTES
// 2. validatePost
function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "Missing required text field" })
  } else {
    Posts.insert({ ...req.body, user_id: req.params.id })
      .then((data) => {
        req.post = data;
        next();
      })
      .catch((data) => {
        res.status(500).json({ error: "Something went wrong" });
      });
  }
}

module.exports = router;
