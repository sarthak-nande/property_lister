import { validateUserRegistration } from "../zod/user.validation";


async function SignUpUser(req, res){
    try{
        const userData = req.body;
        
        validateUserRegistration(userData);

        await SignupProcessChecks(userData);

        res.status(200).json({
            message: "OTP sent to your email. Please verify to complete registration.",
            email: userData.email,
            requireOTP: true
            
        });
    }
    catch(error){
        console.error("Error during user signup:", error);
        res.status(400).json({message: error.message});
    }
}