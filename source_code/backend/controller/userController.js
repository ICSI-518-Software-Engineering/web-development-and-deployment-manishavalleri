const userModel= require('../model/user')
const bcrypt = require("bcrypt");
const JWTToken= require("../utlits/helperFunction")
const path= require("path")
const BASE_URI= process.env.BASE_URL

// get users,, that fetch all user from mongo db database 
const getUsers= (req,res)=>{

  userModel.find({}).then(response=>{

    if(response){
       
      let modified_data=  response.map(item=>{
        if(item.image != undefined)
       return {...item._doc,image:BASE_URI+"/images/"+item.image}
        else return item
    })
    
        let payload={
            status:"ok",
            data:modified_data
        }
        res.send(JSON.stringify(payload))
    }else{
        let payload={
            status:"error",
            data:error,
            message:"Users not found"
        }
        res.send(JSON.stringify(payload))
    }
  }).catch(error=>{
    let payload={
        status:"error",
        data:error,
        message:error
    }
    res.send(JSON.stringify(payload))
  })
}

const getUserInfo = (req, res) => {
    try {
      // Extract the user ID from the request headers
      const userId = req.headers.userid;
  
      // Find the user by ID in the database
      userModel.findById(userId).then(user => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        // Return user information
        res.json({ user });
      }).catch(error => {
        console.error("Error fetching user info:", error);
        res.status(500).json({ message: "Internal server error" });
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


// add user, that take the data for new user and add it to mongo db database, password will be encrypted

const addUser=(req,res)=>{

    let newUser= userModel({...req.body})
    userModel.findOne({name:req.body.name}).then(onfound=>{
        if(onfound){
            let payload={
                status:"error",
                data:null,
                message:"User exist with same name, try different user name"
            }
            res.send(JSON.stringify(payload))
        }else{
            newUser.save().then(onSave=>{
                let payload={
                    status:"ok",
                    data:{},
                    message:"Registered Successfully"
                }
                res.send(JSON.stringify(payload))
            
            }).catch(error=>{
                let payload={
                    status:"error",
                    data:error,
                    message:error
                }
                res.send(JSON.stringify(payload))
            })
        }
    }).catch(error=>{
        let payload={
            status:"error",
            data:error,
            message:error
        }
        res.send(JSON.stringify(payload))
    })

}


// edit user take the details to edit user in databasae
const editUser=(req,res)=>{
    const {name,bio,_id}= req.body


    let toBeSet={name}
    if(bio != undefined) toBeSet={...toBeSet, bio}
    if(req.files)
    {  
          const{image}= req.files
          toBeSet={...toBeSet, image:_id+"_"+image.name}
          image.mv(
            path.resolve(
              __dirname,
              "../public/images",
              _id+"_"+image.name
            ),
            (errorInMovingFile) => {
                if(errorInMovingFile) {  
                    let payload={
                    status:"error",
                    data:errorInMovingFile,
                    message:"Error in moving file"
                }
                res.send(JSON.stringify(payload))
            }
        }
    );
    }
    userModel.findOneAndUpdate({_id:_id},{
        $set: {
            ...toBeSet
        },
      },
      { new: true }).then(onUpdate=>{
        if(onUpdate){
            let UpdatedData={...onUpdate._doc}
           
        if(UpdatedData.image != undefined){
          
            UpdatedData={...UpdatedData, image:BASE_URI+"/images/"+UpdatedData.image}
        
            }
            let payload={
                status:"ok",
                data:UpdatedData,
                message:"Updated Successfully"
            }
            res.send(JSON.stringify(payload))
        }else{
            let payload={
                status:"error",
                data:error,
                message:"User not found"
            }
            res.send(JSON.stringify(payload))
        }

    }).catch(error=>{
        let payload={
            status:"error",
            data:error,
            message:error
        }
        res.send(JSON.stringify(payload))
    })
}

// verify user verifies the credintials of user and allow user to login and send jwt token on successfull login
const verifyUser=(req,res)=>{
    const {name,password}= req.body
    userModel.findOne({name}).then(userFound=>{
        if(userFound){
            bcrypt.compare(
                password,
                userFound._doc.password,
                function (err, result) {
                  if (result) {
                
                    const token = JWTToken.getToken(userFound._doc._id);
                    let userData=  {...userFound._doc,token}
                    if(userFound._doc.image) userData={...userData,image:BASE_URI+"/images/"+userFound._doc.image}
                    let payload={
                        status:"ok",
                        data: userData
                    }
                    res.send(JSON.stringify(payload))
                 
                  } else {
                    let payload={
                        status:"error",
                        data:null,
                        message:"Incorrect Password"
                    }
                    res.send(JSON.stringify(payload))
                  }
                }
              );
        }else{
            let payload={
                status:"error",
                data:null,
                message:"Incorrect User Name"
            }
            res.send(JSON.stringify(payload))
        }
    }).catch(error=>{
        let payload={
            status:"error",
            data:error.message,
        }
        res.send(JSON.stringify(payload))
    })
}

module.exports={getUsers, addUser, editUser,verifyUser , getUserInfo}