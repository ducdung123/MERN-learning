let User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class UserController {
    //POST api/auth/register
    // desc: register user
    //access: public
    async create(req, res, next) {
        const { username, password } = req.body;

        //simple validation
        if (!username || !password) {
            return res
                .status(400)
                .json({ success: false, message: "Missing username of passwork" })
        }
        try {
            const user = await User.findOne({ username })
            // console.log(user)
            if (user) {
                return res
                    .status(400)
                    .json({ success: false, message: "username is exist" })
            }
            const hashedPassword = await argon2.hash(password);
            // console.log(hashedPassword);

            const newUser = await User.create({ username, password: hashedPassword });

            //return token
            const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
            return res
                .json({ success: true, message: "User created", accessToken })
        }
        catch (err) {
            return res
                .status(500)
                .json({ success: false, message: 'err' })
        }
    }
    //POST api/auth/login
    // desc: login user
    //access: public
    async check(req, res, next) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ success: false, message: "Missing username of passwork" })
        }
        try {
            const user = await User.findOne({ username })
            // console.log(user)
            if (!user) {
                return res
                    .status(400)
                    .json({ success: false, message: "password or username is incorrect" })
            }
            //user found
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid) {
                return res
                    .status(400)
                    .json({ success: false, message: "password or username is incorrect" })
            }
            // console.log(passwordValid)
            //all ok
            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
            return res
                .json({ success: true, message: "User login", accessToken })
        }
        catch (err) {
            return res
                .status(500)
                .json({ success: false, message: 'err' })
        }
    }
    //GET api/auth
    // desc: check if user is logged in
    //access: public
    async isLogin(req, res) {
        try {
            const user = await User.findById(req.userId).select('-password')
            if (!user) {
                return res.status(400).json({ success: false, message: 'user not found' })
            }
            res.json({ success: true, user })
        }
        catch (err) {
            return res
                .status(500)
                .json({ success: false, message: 'err' })
        }
    }
}

module.exports = new UserController();
