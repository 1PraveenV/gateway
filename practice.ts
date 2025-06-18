exports.login = async(req, res)=> {

    try {
        //data fetch
        const {email, password} = req.body
        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: "Plz fill all the details carefully"
            })
        }

        let User= await  user.findOne({email})
        //if user not registered or not found in database
        if(!User){
            return res.status(401).json({
                success: false,
                message: "You have to Signup First"
            })
        }

        const payload ={
            email: User.email,
            id: User._id,
            role: User.role,
        }
   
        if(await bcrypt.compare(password,User.password)){
         
             let token = jwt.sign(payload, 
                        process.env.JWT_SECRET,
                        {expiresIn: "2h"}
                        )
            User = User.toObject()
            User.token = token
            
            User.password = undefined
            const options = {
                expires: new Date( Date.now()+ 3*24*60*60*1000),
                httpOnly: true  //It will make cookie not accessible on clinet side -> good way to keep hackers away

            }
            res.cookie(
                "token",
                token,
                options
            ).status(200).json({
                success: true,
                token,
                User,
                message: "Logged in Successfully"

            })

        }else{
            //password donot matched
            return res.status(403).json({
                success: false,
                message: "Password incorrects⚠️"
            })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Login failure⚠️ :" + error
        })
    }

}


exports.sendotp = async (req, res) => {
	try {
		const { email } = req.body;

		// Check if user is already present
		// Find user with provided email
		const checkUserPresent = await user.findOne({ email });
		// to be used in case of signup

		// If user found with provided email
		if (checkUserPresent) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

        // var otpGenerator=10
		var otp = OtpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		const result = await otp.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
		while (result) {
			otp = OtpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
		const otpPayload = { email, otp };
		const otpBody = await otp.create(otpPayload);
		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};