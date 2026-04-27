import { User } from "../Models/user.model.js";
import { Blogs } from "../Models/blogs.model.js";
import { customError } from "../Utils/errorClass.js";
import bcrypt from "bcrypt"
import { sendEmail } from "../Services/emailService.js";
import { otpVerificationTemplate } from "../Templates/OtpVerificationTemplate.js";
import jwt from "jsonwebtoken"



// register user controller
const registerUserController = async (req, res) => {

 
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
           throw new customError(400, "all fields are required"); 
    }
    // for already registered users

    const existingUser = await User.findOne({ email });

    if (existingUser) {
         throw new customError(400, "User Already exists"); 
    }

    // password hashing 

    const hashedPassword = await bcrypt.hash(password, 12);

    // OTP creation

  const OTP = Math.floor(100000 + Math.random() * 900000);
   
    // if first time user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      OTP 
    });
     
    // send OTP Email

    // sendEmail(
    //   email,
    //   "OTP Verification",
    //   otpVerificationTemplate.replace("{OTP}", OTP),
    // );

    // send final response

    res.status(201).json({ status: "success", message : "user registered successfully" });

};

// otp verification controller

const otpVerificationController = async (req, res) => { 
  const { email, otp } = req.body;

  console.log(email, otp);

  if (!email || !otp) {
    throw new customError(400, "All fields are required")
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new customError(400, "User not found")
  }

  console.log(otp , user.OTP)
  if (user.OTP !== otp) {
    throw new customError(400, "Incorrect OTP")
  }

  // updating database fields
    user.OTP = null;
    user.isVerified = true;
    user.save();

  res.status(200).json({ status: "success", message: "OTP successfully verified" })
};

// login controller

const loginController = async (req, res) => {
    const { email, password } = req.body;

  if (!email || !password) {
    throw new customError(400, "All fields are required")
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new customError(400, "User not found")
  }

  if (!user.isVerified) {
    throw new customError(400, "User not verified")
  }

  const isPasswordValid = await bcrypt.compare(password,user.password)

  if (!isPasswordValid) {
    throw new customError(400, "Incorrect password")
  }

  const token = jwt.sign({ userId: user._id , role : user.role}, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  // res.status(200).json({ status: "success", message: "Login successful" , userId : user._id , token })

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // Requires HTTPS
    sameSite: "Strict",
    // maxAge: 3600000, // 1 hour in ms
    
  });

  res
    .status(200)
    .json({
      status: "success",
      message: "Login successful",
      userId: user._id,
    });

};

const getUserDetailsController =async (req, res)=> {
      
  const {userId} = req.params

  if (!userId) {
    throw new customError(400, "User id not found")
  }

  const existingUser = await User.findById(userId).populate("blogs")

  if(!existingUser) {
     throw new customError(404, "User Not found");
  }
 
  const userData = {
    name : existingUser.name,
    email : existingUser.email,
    phone : existingUser.phone,
    blogs : existingUser.blogs
  }

  res.status(200).json({status : "success", message : "user data got successfully", userData})

}


// blog controllers ==================

const postBlogController  = async(req, res)=> {
   
  const { userId } = req.params
  const { title, category, content } = req.body
  
  if(!title || !category || !content) {
    throw new customError(400, "all fields are required")
  }

  if(!userId) {
    throw new customError(400, "no userId found")
  }
  
  const existingUser = await User.findById(userId);

  if (!existingUser) {
    throw new customError(404, "no user found");
  }

const blog = await Blogs.create({ title, category, content });
  
existingUser.blogs.push(blog._id);
blog.author = userId;

blog.save()
existingUser.save()


res.status(201).json({status : "success", message : "Blog created Successfully"})
}

export {
  registerUserController,
  otpVerificationController,
  loginController,
  getUserDetailsController,
  postBlogController,
};
