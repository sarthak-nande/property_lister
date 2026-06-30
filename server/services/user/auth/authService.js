import bcrypt from 'bcrypt';
import User from '../model/User';

async function generateAccessTokenAndRefreshToken(userId) {
    try{
        const user = await User.findById(userId);

        if(!user){
            throw new Error("User Not Found Please Check Once")
        }

        const accessToken = user.getAccessToken();
        const refreshToken = user.refreshToken;

        if(!refreshToken || !accessToken){
            throw new Error("Token Is Missing")
        }

        await user.save();

        return {accessToken, refreshToken}
    } 
    catch{
        console.error("Process Failed During Generating Access And Refresh Tokens")
    }
}

async function SignupProcessChecks(userData) {
    try{
        const email = userData.email;
        const password = userData.password;
        
        if(!email){
            throw new Error("User Email Address Missing!");
        }

        if(!password){
            throw new Error("User Password Missing!");
        }

        const isEmailAddressAlreadyExist = User.findOne({
            email: email
        });

        if(isEmailAddressAlreadyExist){
            throw new Error("User provided email already exist");
        }
    }
    catch(error){
        console.error("Process Failed During Signup Process Checks", error);
    }
}

export { generateAccessTokenAndRefreshToken, SignupProcessChecks };