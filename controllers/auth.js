import bcrypt from "bcryptjs/dist/bcrypt.js";
import Auth from "../models/auth.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userEmail = await Auth.findOne({ email });

    if (userEmail) {
      return res.status(500).json({ message: "User is already exist!" });
    }

    if (password.length < 6) {
      return res.status(500).json({ message: "Password must not be less than 6 characters!" }); 
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await Auth.create({username, email, password: passwordHash});

    const userToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.status(201).json({ status: 'OK', newUser, userToken });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Auth.findOne({ email });
        if(!user){
            return res.status(500).json({message: 'User not found!'});
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(500).json({message: 'Invalid credentials!'});
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({status: 'OK', user, token});

    } catch (error) {
        return res.status(500).json({  message: error.message });
    }
}

export { register, login };