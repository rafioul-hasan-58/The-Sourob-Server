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
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("./app/config"));
const auth_route_1 = __importDefault(require("./app/modules/auth/auth.route"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ['https://my-portfolio-orpin-iota-84.vercel.app'], credentials: true }));
app.use("/api/auth", auth_route_1.default);
// routes
const uri = config_1.default.database_url;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const portfolioCollection = client.db("Portfolio").collection("projects");
            const blogCollection = client.db("Portfolio").collection("blogs");
            const messageCollection = client.db("Portfolio").collection("message");
            // project operation
            app.post('/upload-project', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const projectData = req.body;
                const result = yield portfolioCollection.insertOne(projectData);
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Project uploaded successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            app.get('/get-all-projects', (req, res) => __awaiter(this, void 0, void 0, function* () {
                // console.log(req.body);
                const result = yield portfolioCollection.find().toArray();
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Project retrived successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            app.get('/get-single-project/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield portfolioCollection.findOne(query);
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Project retrived successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            app.delete('/delete-project/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield portfolioCollection.deleteOne(query);
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Project deleted successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            app.patch('/update-project/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
                // console.log(req.body);
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const options = { upsert: true };
                const itemData = req.body;
                const updatedDoc = {
                    $set: Object.assign({}, itemData)
                };
                const result = yield portfolioCollection.updateOne(query, updatedDoc, options);
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Project updated successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            //blog operation 
            app.post('/write-blog', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const projectData = req.body;
                const result = yield blogCollection.insertOne(projectData);
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Blog uploaded successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            app.get('/get-all-blogs', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = yield blogCollection.find().toArray();
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Blogs retrived successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            app.get('/get-single-blog/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield blogCollection.findOne(query);
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Blog retrived successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            app.delete('/delete-blog/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield blogCollection.deleteOne(query);
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Blog deleted successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            app.patch('/update-blog/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
                // console.log(req.body);
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const options = { upsert: true };
                const itemData = req.body;
                const updatedDoc = {
                    $set: Object.assign({}, itemData)
                };
                const result = yield blogCollection.updateOne(query, updatedDoc, options);
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Blog updated successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            //connections
            app.post('/send-message', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const projectData = req.body;
                const result = yield messageCollection.insertOne(projectData);
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Message sent successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            //get message
            app.get('/get-all-messages', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = yield messageCollection.find().toArray();
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Message retrived successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            app.get('/get-single-message/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield messageCollection.findOne(query);
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Message retrived successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            app.delete('/delete-message/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield messageCollection.deleteOne(query);
                res.status(http_status_1.default.OK).json({
                    success: true,
                    message: 'Message deleted successfully',
                    statusCode: 201,
                    data: result
                });
            }));
            // Send a ping to confirm a successful connection
            yield client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
        }
    });
}
run().catch(console.dir);
// testing
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Server Running!!!');
});
app.get('/', test);
exports.default = app;
