var db = require("../db/");
var _ = require("underscore");
var strToMongooseObjectId = require("mongoose").Types.ObjectId;
var notify = require("../notify");

module.exports = function(app, express) {

  //return list of all tasks - exclude my tasks
  app.get('/api/tasks', isAuthenticated, function(req, res) {

    // TODO: take a search query in request params to return
    // search results on 'description/name'

    db.Task.find({
        $and: [
          // find ones that are not related to current user
          {
            owner: {
              $ne: req.user._id
            }
          }, {
            assignedTo: {
              $eq: null
            }
          }, {
            applicants: {
              $ne: req.user._id
            }
          }
        ]
      })
      // there are no joins in mongoose, c'mon..
      // make do with .popluate() instead

    // this gives you `name` only
    // must call multiple times per mongoose's doc
    .populate({
        path: 'owner', // model property to replace
        select: 'name' // looked up ref model property to return
      })
      .populate({
        path: 'assignedTo',
        select: 'name'
      })
      .populate({
        path: 'applicants',
        select: 'name'
      })
      // this will give you everything
      // .populate('owner assignedTo applicants')
      .exec(function(err, tasks) {
        if (err) {
          res.status(500).end();
        } else {
          res.status(200).send(tasks);
        }
      });
  });

  // return list of all user tasks
  // wher user is owner, assigned to a task or is an applicant
  // adds additional boolean properties on each task
  // 'isOwner', 'isAssignedToMe', 'appliedTo'
  app.get('/api/mytasks', isAuthenticated, function(req, res) {
    db.Task.find({
        $or: [{
          owner: {
            $eq: req.user._id
          }
        }, {
          assignedTo: {
            $eq: req.user._id
          }
        }, {
          applicants: {
            $eq: req.user._id
          }
        }]
      })
      .populate({
        path: 'owner',
        select: 'name'
      })
      .populate({
        path: 'assignedTo',
        select: 'name'
      })
      .populate({
        path: 'applicants',
        select: 'name'
      })
      .lean() // allow resulting models to be modifiable
      .exec(function(err, tasks) {
        if (err) {
          res.status(500).end();
        } else {
          tasks = _.map(tasks, function(task) {
            task.isOwner = task.owner._id.equals(req.user._id);
            task.isAssignedToMe = task.assignedTo ? task.assignedTo._id.equals(req.user._id) : false;
            task.appliedTo = _.some(task.applicants, function(user) {
              return user._id.equals(req.user._id);
            });
            return task;
          });
          res.status(200).send(tasks);
        }
      });
  });

  //create new task
  app.post('/api/tasks', isAuthenticated, function(req, res) {
    //TODO: do some input valiation on req.body
    db.Task.create({
      owner: new strToMongooseObjectId(req.user._id),
      information: req.body,
      applicants: [],
      assignedTo: null
    }, function(err, task) {
      if (err) {
        res.status(500).end();
      } else {
        res.status(201).send(task);
      }
    });

  });


  app.post('/inboxes', function(req, res) {
    //TODO: do some input valiation on req.body
    db.Message.create({
      from: "needQuery",
      to: req.body.messageName,
      category: req.body.messageCategory,
      message: req.body.description
    }, function(err, task) {
      if (err) {
        console.log(err);
        console.log("got here, not working");
        res.status(500).end();
      } else {
        console.log("THIS IS THE REQUEST", req.params);
        console.log("got here, no working");
        res.status(201).send(task);
      }
    });
  });


  //update information of one specific task.
  app.post('/api/tasks/:id', isAuthenticated, function(req, res) {
    var taskId = req.params.id;
    var updatedInformation = req.body;
    //verify task exists and user is owner
    db.Task.findById(taskId)
      .populate({
        path: 'owner',
        select: 'name'
      })
      .populate({
        path: 'assignedTo',
        select: 'name'
      })
      .populate({
        path: 'applicants',
        select: 'name'
      })
      .exec(function(err, task) {
        if (err) {
          return res.status(500).end();
        }

        if (task == null) {
          return res.status(404).end();
        }

        // owner can only update/edit task before anyone applies or is assigned
        if (!task.owner._id.equals(req.user._id) || task.assignedTo || task.applicants.length) {
          res.status(403).end();
        } else {
          task.information = updatedInformation;
          task.save(function(err) {
            if (err) {
              res.status(500).end();
            } else {
              res.status(200).end();
            }
          });
        }
      });

  });

  app.get('/api/profile/:id', isAuthenticated, function(req, res) {
    var userId = req.params.id;
    console.log("wtf")
    //verify task exists and user is owner
    db.users.findById(userId)
      .populate()
      .lean()
      .exec(function(err, profile) {
        console.log("ok?");
        if (err) {
          res.status(500).end();
        } else {
          res.status(200).send(profile);
        }
      });

  });

  //get one specific task
  app.get('/api/tasks/:id', isAuthenticated, function(req, res) {
    var taskId = req.params.id;
    db.Task.findById(taskId)
      .populate({
        path: 'owner',
        select: 'name'
      })
      .populate({
        path: 'assignedTo',
        select: 'name'
      })
      .populate({
        path: 'applicants',
        select: 'name'
      })
      .lean()
      .exec(function(err, task) {
        if (err) {
          return res.status(500).end();
        }
        if (task) {
          task.isOwner = task.owner._id.equals(req.user._id);
          task.isAssignedToMe = task.assignedTo ? task.assignedTo._id.equals(req.user._id) : false;
          task.appliedTo = _.some(task.applicants, function(user) {
            return user._id.equals(req.user._id);
          });
          res.status(200).send(task);
        } else {
          res.status(404).end();
        }
      });
  });

  //delete a task which has not been assigned
  app.delete('/api/tasks/:id', isAuthenticated, function(req, res) {
    var taskId = req.params.id;

    db.Task.remove({
      $and: [{
        _id: {
          $eq: taskId
        }
      }, {
        owner: {
          $eq: req.user._id
        }
      }, {
        assignedTo: {
          $eq: null
        }
      }]
    }, function(err, task) {
      if (err) {
        return res.status(500).end();
      }
      if (task) {
        res.status(200).end();
      } else {
        res.status(403).end();
      }
    });

  });

  app.post('/api/task/assign', isAuthenticated, function(req, res) {
    var taskId = req.body.task;
    var userId = req.body.user;
    //check task is valid, owned by user,
    //not yet assigned and and userId is an applicants
    db.Task.findById(taskId)
      .where({
        $and: [{
            owner: {
              $eq: req.user._id
            }
          }, {
            assignedTo: {
              $eq: null
            }
          }, {
            applicants: {
              $eq: userId
            }
          } // userId is checked against an array of strings by mongoose
        ]
      })
      .exec(function(err, task) {
        if (err) {
          return res.status(500).end();
        }
        if (task) {
          task.assignedTo = new strToMongooseObjectId(userId);
          task.save(function() {
            res.status(201).end();
            //notify applicant that they have been assigned the task
            notify.taskAssigned(taskId);
          });
        } else {
          res.status(403).end();
        }
      });
  });

  app.post('/api/task/apply', isAuthenticated, function(req, res) {
    var taskId = req.body.task;
    //Todo - prevent owner from applying and user applying more than once
    db.Task.findById(taskId)
      .where({
        assignedTo: {
          $eq: null
        }
      })
      .populate({
        path: 'applicants',
        select: 'name'
      })
      .exec(function(err, task) {
        if (err) {
          return res.status(500).end();
        }
        if (task) {
          var isApplicant = _.some(task.applicants, function(user) {
            return user._id.equals(req.user._id);
          });

          if (!isApplicant) {
            task.applicants.push(new strToMongooseObjectId(req.user._id));
            task.save(function() {
              res.status(201).end();
              //notify owner of task of a new application
              notify.newApplication(taskId);
            });
          } else {
            res.status(403).end();
          }
        } else {
          res.status(403).end();
        }
      });
  });

  app.get('/api/task/complete/:id', isAuthenticated, function(req, res) {
    var taskId = req.params.id;

    db.Task.findById(taskId)
      .where({
        owner: {
          $eq: req.user._id
        }
      })
      .exec(function(err, task) {
        if (err) {
          return res.status(500).end();
        }
        if (task) {
          task.complete = true;
          task.save(function() {
            res.status(200).end();
          });
        } else {
          res.status(403).end();
        }
      });
  });
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
}
