// const express = require('express');
// const db = require('./userDb.js');
// const postdb = require('../posts/postDb.js');
// const postRouter = ('../posts/postRouter')

// const router = express.Router();
// router.use('/:id', validateUserId)
// router.use('/:id/posts/', postRouter);


// //-----------------------------------------------//
// // POST /API/USERS  use .insert() for post.
// router.post('/', validateUser, (req, res) => {
//   db.insert(req.body)
//   .then(result => {
//     res.status(201).json(result)
//   })  
// });

// //-----------------------------------------------//
// // POST /API/USERS/ID/POSTS
// router.post('/:id/posts', validatePost, (req, res) => {
//   postdb.insert(req.body)
//   .then(result => {
//     res.status(201).json(result)
//   })
//   .catch(err => {
//     res.status(500).json({errorMessage: "Sorry, something whent wrong"})
//   })
// });

// //-----------------------------------------------//
// // GET /API/USERS
// router.get('/', (req, res) => {
//   db.get()
//   .then(result => {
//     res.status(200).json(result)
//   })
// });

// //-----------------------------------------------//
// // GET /API/USERS/ID
// router.get('/:id', (req, res) => {
//   // Will return a user with specified id
//   res.status(200).json(req.user);
// });

// //-----------------------------------------------//
// // GET /API/USERS/ID/POSTS
// router.get('/:id/posts', (req, res) => {
//   // Users.getUserPosts(req.user.id)
//   //   .then((data) => {
//   //     res.status(200).json(data)
//   //   })
//   //   .catch((data) => {
//   //     res.status(500).json({ error: "Something went wrong" })
//   //   })
// });

// //-----------------------------------------------//
// // DELETE /API/USERS
// router.delete('/:id', (req, res) => {
//   db.remove(req.user.id)
//   .then(result => {
//     res.status(204).end()
//   })
//   .catch(erro => {
//     res.status(500).json({errorMessage: "Sorry something went wrong"})
//   })
// });

// //-----------------------------------------------//
// // PUT /API/USERS
// router.put('/:id', validateUser, (req, res) => {
//   db.update(req.user.id, req.body)  // This is to update this req the user id and the body after this you can call the fo the result
//   .then(result => {
//     res.status(200).json({...req.body, id: req.user.id})
//   })
//   .catch(err => {
//     res.status(500).json({errorMessage: "Sorry something went wrong"})
//   })
// });

// //CUSTOM MIDDLEWARE. TO BE USED IN ROUTES
// // 2. validateUserId
// function validateUserId(req, res, next) {
//   const userId = req.params.id ?  req.params.id : -1
//   db.getById(userId)
//   .then(result => {
//     if (!result) {
//       res.status(400).json({ message: "Invalid user id" })
//     } 
//     else {
//       req.user = result
//       next()
//     }
//   })
//   .catch(err => {
//     res.status(500).json({errorMessage: "Sorry something went wrong"})
//   })  
//   //IN Postman run ----  GET localhost:4000/api/users/1
// }

// //CUSTOM MIDDLEWARE. TO BE USED IN ROUTES
// // 2. validateUser
// function validateUser(req, res, next) {
//   if (!req.body) {
//     res.status(400).json({message: "Missing user data"})
//   } 
//   else if (!req.body.name) {
//     res.status(400).json({ message: "Missing requierd name field" })
//   } 
//   else {
//     next()
//   }
// }

// //CUSTOM MIDDLEWARE. TO BE USED IN ROUTES
// // 2. validatePost
// function validatePost(req, res, next) {
//   // This is to require the body 
//   if (!req.body) {
//     res.status(400).json({message: "Missing post data"})
//   }   // This is to required the text in the body 
//   else if (!req.body.text) {
//     res.status(400).json({ message: "Missing required text field" })
//   }
//   else {
//     req.body.user_id = req.params.id
//     next()
//   }
// }

// module.exports = router;

const express = require('express');
const db = require('./userDb')
const postdb = require('../posts/postDb')
const postRouter = require('../posts/postRouter')

const router = express.Router();
router.use('/:id', validateUserId)
router.use('/:id/posts/', postRouter)


//good
router.post('/', validateUser, (req, res) => {
  db.insert(req.body)
    .then(result => {
      res.status(201).json(result)
    })
});

//good
router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  postdb.insert(req.body)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Sorry, something went wrong' })
    })
});

//good
router.get('/', (req, res) => {
  // do your magic!
  db.get()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Sorry, something went wrong' })
    })
});

//good
router.get('/:id', (req, res) => {
  res.status(200).json(req.user)
});

//good
router.get('/:id/posts', (req, res) => {
  // do your magic!

});


router.delete('/:id', (req, res) => {
  // do your magic!
  db.remove(req.user.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Sorry Something went wrong' })
    })
});

router.put('/:id', validateUser, (req, res) => {
  // do your magic!
  db.update(req.user.id, req.body)
    .then(result => {
      res.status(200).json({ ...req.body, id: req.user.id })
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Sorry Something went wrong' })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  const userId = req.params.id ? req.params.id : -1
  db.getById(userId)
    .then(result => {
      if (!result) {
        res.status(400).json({ message: "invalid user id" })
      }
      else {
        req.user = result
        next()
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong' })
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing user data" })
  }
  else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  }
  else {
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  }
  else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  }
  else {
    req.body.user_id = req.params.id
    next()
  }
}

module.exports = router;
