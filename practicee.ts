const otpGenerator = require('otp-generator');
const OTP = require('../models/Otp');
const { sendOTPEmail } = require('./libs/utils/mailer');


const generateAndSendOTP = async (email) => {
    try {
        
        await OTP.findOneAndDelete({ email });
    
        const otp = otpGenerator.generate(6, {
            digits: true,
            alphabets: false,
            upperCase: false,
            specialChars: false
        });

        const newOTP = new OTP({
            email,
            otp
        });
        await newOTP.save();

        await sendOTPEmail(email, otp);

        return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
        console.error('Error generating OTP:', error);
        throw error;
    }
};


const verifyOTP = async (email, otp) => {
    try {
        const otpRecord = await OTP.findOne({ email });

        if (!otpRecord) {
            return { success: false, message: 'OTP not found or expired' };
        }

        if (otpRecord.otp !== otp) {
            return { success: false, message: 'Invalid OTP' };
        }

        // OTP is valid, delete it from DB
        await OTP.findOneAndDelete({ email });

        return { success: true, message: 'OTP verified successfully' };
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
};

module.exports = { generateAndSendOTP, verifyOTP };