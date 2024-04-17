const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user = mongoose.Schema({
  name: { required: true, type: String },
  bio: { type: String },
  image: { type: String },
  password:{required:true, type: String}
});


user.pre("save", function (next) {
    
    bcrypt.hash(this.password, 5, (err, hash) => {
      if (!err) {
        this.password = hash;
        next();
      } else console.log(err);
      // need to handle else here
    });
  });
  
  const userModel = mongoose.model("user", user);
  
  module.exports = userModel;