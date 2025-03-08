"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const auth_model_1 = require("./auth.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const randomPass = Math.ceil(Math.random() * 1000000);
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    try {
        const { name, email, role } = req.body;
        // console.log(req.body);
        const password = req.body.password || randomPass;
        // Check if user already exists
        const existingUser = yield auth_model_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Create new user
        // const user = new User({
        //   name,
        //   email,
        //   role,
        //   password,
        // });
        // Save user to database
        const result = yield auth_model_1.User.create({ name, email, role, password });
        // console.log('result', result);
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = yield auth_model_1.User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        // Validate password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        res.status(200).json({ message: "Login successful", user });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.loginUser = loginUser;
