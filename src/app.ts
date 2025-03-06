/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import httpStatus from "http-status"
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import config from './app/config';



const app: Application = express()
// parser
app.use(express.json())
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
// routes


const uri = config.database_url as string

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const portfolioCollection = client.db("Portfolio").collection("projects")
    const blogCollection = client.db("Portfolio").collection("blogs")
    const messageCollection = client.db("Portfolio").collection("message")


    // project operation
    app.post('/upload-project', async (req, res) => {
      const projectData = req.body;
      const result = await portfolioCollection.insertOne(projectData)
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Project uploaded successfully',
        statusCode: 201,
        data: result
      })
    })
    app.get('/get-all-projects', async (req, res) => {
      // console.log(req.body);
      const result = await portfolioCollection.find().toArray()
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Project retrived successfully',
        statusCode: 201,
        data: result
      })
    })
    app.get('/get-single-project/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await portfolioCollection.findOne(query)
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Project retrived successfully',
        statusCode: 201,
        data: result
      })
    })
    app.delete('/delete-project/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await portfolioCollection.deleteOne(query)
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Project deleted successfully',
        statusCode: 201,
        data: result
      })
    })
    app.patch('/update-project/:id', async (req, res) => {
      console.log(req.body);
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const itemData = req.body;
      const updatedDoc = {
        $set: {
          ...itemData
        }
      }
      const result = await portfolioCollection.updateOne(query, updatedDoc, options)
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Project updated successfully',
        statusCode: 201,
        data: result
      })
    })

    //blog operation 
    app.post('/write-blog', async (req, res) => {
      const projectData = req.body;
      const result = await blogCollection.insertOne(projectData)
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Blog uploaded successfully',
        statusCode: 201,
        data: result
      })
    })
    app.get('/get-all-blogs', async (req, res) => {
      const result = await blogCollection.find().toArray()
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Blogs retrived successfully',
        statusCode: 201,
        data: result
      })
    })
    app.get('/get-single-blog/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await blogCollection.findOne(query)
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Blog retrived successfully',
        statusCode: 201,
        data: result
      })
    })
    app.delete('/delete-blog/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await blogCollection.deleteOne(query)
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: 201,
        data: result
      })
    })
    app.patch('/update-blog/:id', async (req, res) => {
      console.log(req.body);
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const itemData = req.body;
      const updatedDoc = {
        $set: {
          ...itemData
        }
      }
      const result = await blogCollection.updateOne(query, updatedDoc, options)
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Blog updated successfully',
        statusCode: 201,
        data: result
      })
    })
    //connections
    app.post('/send-message', async (req, res) => {
      const projectData = req.body;
      const result = await messageCollection.insertOne(projectData)
      res.status(httpStatus.OK).json({
        success: true,
        message: 'Message sent successfully',
        statusCode: 201,
        data: result
      })
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// testing
const test = async (req: Request, res: Response) => {
  res.send('Server Running!!!')
}
app.get('/', test)



export default app