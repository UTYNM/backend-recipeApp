const { User } = require("../models");
const bcrypt = require("bcrypt");
const { regisUser, loginUser } = require("../validation/user");
const { generateToken } = require("../helpers/jwt");

class Controller {
    static async register (req, res) {
        try {
            const {error} = regisUser.validate(req.body);
            if(error){
                return res.status(400).json({ error: error.message });
            }

            const { name, email, password } = req.body;
            const isExist = await User.findOne({ where: { email } });
            if (isExist) {
                return res.status(400).json({ message: "Email has been registered" });
            }

            await User.create({ name, email, password });

            return res.status(201).json({ message: "Account has been successfully created, please log in.",});
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    static async login (req, res) {
        try {
            const {error} = loginUser.validate(req.body);
            if(error){
                return res.status(400).json({ error: error.message });
            }

            const { email, password } = req.body;
            const users = await User.findOne({ where: { email } });
    
            if (!users) {
                return res.status(400).json({ message: "Incorrect email or password" });
            }
    
            const isValidPassword = await bcrypt.compare(password, users.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: "Incorrect email or password" });
            }
    
            const payload = {
                id: users.id,
                email: users.email,
                isAdmin: users.isAdmin,
            };
    
            const token = generateToken(payload);
    
            return res.status(200).json({ token });
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };
}
module.exports = Controller;