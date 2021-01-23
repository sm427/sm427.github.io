/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/ 

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Times = require("./models/times.js");
const Lobbies = require("./models/lobbies.js");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

const { uploadImagePromise, deleteImagePromise, downloadImagePromise } = require("./storageTalk.js");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  } 

  res.send(req.user);
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});
// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/user", (req, res) => {
  if (req.body.userId) {
    User.find({_id: req.body.userId}).then((user) => {
      user[0].username = req.body.username;
      user[0].save().then((updatedUser)=>res.send(updatedUser));
    })
  }
});

router.post("/times", auth.ensureLoggedIn, (req,res) => {
  const newTimes = new Times({
    username: req.body.user.username,
    time: req.body.finalTime,
    templateId: req.body.templateId,
  });
  newTimes.save().then((time) => res.send(time));
})

router.post("/reportTime", auth.ensureLoggedIn, (req, res) => {
  User.updateOne({ _id: req.body.user._id },{ $push: { playedTimes: req.body.finalTime } }).then((user) => {
  res.send({}); });
})

router.get("/getTimes", auth.ensureLoggedIn, (req,res) => {
  User.find({_id: req.query.userId}).then((user) => {
    res.send(user.playedTimes)
  })
})

router.get("/getTemplateTimes", (req,res) => {
  Times.find({templateId: req.query.templateId}).then((times) => {
    res.send(times)
  })
})

router.post("/createLobby", auth.ensureLoggedIn, (req,res) => {
  const newLobby = new Lobbies({
    creatorname: req.body.creatorname,
    name: req.body.name,
    code: req.body.code,
    playerCount: req.body.playerCount,
    players: [],
  });
  newLobby.save().then((lobby) => res.send(lobby));
})

router.get("/getLobbies", (req, res) => {
    Lobbies.find({}).then((lobbies)=>res.send(lobbies))
})

router.post("/uploadImage", auth.ensureLoggedIn, (req, res) => {
  if (typeof (req.body.image) !== 'string') {
    throw new Error("Can only handle images encoded as strings. Got type: "
      + typeof (req.body.image));
  }
  User.findById(req.user._id).then(user => {
    if (user.imageNames.length >= 3) {
      // don't allow anyone to have more than 3 images (not race condition safe) - limited it to 1 bc users should obv only have one profile pic
      res.status(412).send({
        message: "You already have a profile picture. Please delete it before you post a new one"
      });
    }
    // only start uploading the image once we know we really want to, since
    // uploading costs money! (if you do it too much)
    return uploadImagePromise(req.body.image);
  }).then(imageName => {
    return User.updateOne({ _id: req.user._id },
      { $push: { imageNames: imageName } });
  }).then(user => {
    res.send({}); // success!
  }).catch(err => {
    console.log("ERR: upload image: " + err);
    res.status(500).send({
      message: "error uploading",
    });
  })
});

router.get("/getImages", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.user._id).then(user => {
    Promise.all(
      user.imageNames.map(imageName => downloadImagePromise(imageName)
        .catch(err => "Err: could not find image"))
    ).then(images => {
      res.send(images);
    }).catch(err => {
      console.log("ERR getImages this shouldn't happen");
      res.status(500).send({
        message: "unknown error"
      });
    });
  });
});

router.post("/deleteImages", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.user._id).then(user => {
    return Promise.all(user.imageNames.map(imageName => {
      return Promise.all([deleteImagePromise(imageName), Promise.resolve(imageName)])
    }));
  }).then(successesAndNames => {
    // get names of removed images
    return successesAndNames.filter(
      successAndName => successAndName[0]).map(
        successAndName => successAndName[1]);
  }).then((removedNames) => {
    return User.findOneAndUpdate({ _id: req.user._id },
      { $pullAll: { imageNames: removedNames } }); // remove those names from the document
  }).then(user => {
    // success!
    res.send({});
  }).catch(err => {
    console.log("ERR: failed to delete image: " + err);
    res.status(500).send()
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
