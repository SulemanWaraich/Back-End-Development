import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {userModel} from "../models/user.model.js" 
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend  
    // validation -- not empty  
    // check if user already exist: username or email  
    // check for images, check for avatar  
    // upload them to cloudinary, avatar  
    // create user object - create entry in db  
    // remove password and refresh token field from response  
    // check for user creation
    // return response  

    const {userName, fullName, password, email} = req.body;
    console.log("email, ", email);

    if([fullName, email, userName, password].some((fields) => fields?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = userModel.findOne({
        $or: [{userName}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
})

export {registerUser}