require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { connectionToDb } = require('./config/db.js');
const { blogRouter } = require('./routers/blog.router.js');
const { projectRouter } = require('./routers/project.router.js');
const app = express();
const port = process.env.PORT;
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("this is home");
})


app.use('/blog',blogRouter);
app.use('/project',projectRouter);


connectionToDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database. Server not started.', error);
  });