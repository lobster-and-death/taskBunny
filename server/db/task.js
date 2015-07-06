var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // user._id of creator of task
  information: Object,  
  // details of task (data from task creating form)
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  // array of individuals (user._id, as a string) applied for task (see below)
  
  // without .populate()
  // [{
  //   "xyzabc"
  // }]

  // with .populate()
  // [{
  //   _id: user._id,
  //   name: user.name
  // }]

  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // user._id of user selected by owner to perform task

  paid: {
    type: Boolean,
    default: false
  },
  
  complete: Boolean,     
  // set to true by owner when task is complete
  reviewed: Boolean
  // set to true when applicant reviews owner

});

module.exports = mongoose.model('Task', TaskSchema);
