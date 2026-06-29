import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

// Define the User schema
const User = new mongoose.Schema({
    basicInfo: {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        profilePicture: {
            type: String,
            default: ''
        }
    },
    role: {
        type: String,
        enum: ["RENTER", "BROKER", "OWNER", "ADMIN"],
        default: "RENTER",
    },
    status:{
        type: String,
        enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
        default: "ACTIVE"
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    },
    isProfileComplete: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
        default: null
    },
    timestamps: true
})

// Method to check if the entered password is correct
User.methods.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.basicInfo.password);
}


// Method to generate access token
User.methods.getAccessToken = async function () {
    const payload = {
        id: this._id,
        email: this.basicInfo.email,
        role: this.role
    };

    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(process.env.ACCESS_TOKEN_EXPIRATION)
        .sign(secret);

    return jwt;
};

// Method to generate refresh token
User.methods.getRefreshToken = async function () {
    const payload = {
        id: this._id,
        email: this.basicInfo.email,
        role: this.role
    }; 
    const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
    const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(process.env.REFRESH_TOKEN_EXPIRATION)
        .sign(secret);
    return jwt;
}

export default mongoose.model('User', User);