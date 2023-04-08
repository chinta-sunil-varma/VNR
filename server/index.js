const express = require("express");
const cors = require('cors');
const mongoose=require('mongoose');


const PORT = process.env.PORT || 3001;

const app = express();
const path = require('path');
const bodyParser=require("body-parser");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

const dburl='mongodb+srv://admin:admin@cluster0.xt5rsxm.mongodb.net/?retryWrites=true&w=majority'

const connectionParams={
  useNewUrlParser:true,
  useUnifiedTopology:true,
}

mongoose.connect(dburl,connectionParams)
.then(()=>{
  console.log("connected to db");
})

.catch((e)=>{
  console.log("Error: ",e);
});

const schema=new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rno: {
    type: String,
    required: true
  },
  blogtitle:{
    type:String,
    required:true
  },
  blogcontent:{
    type:String,
    required:true
  },
  likes:{
    type:Number,
    required:true
  },
  dislikes:{
    type:Number,
    required:true
  }
  
});

const Blogs = mongoose.model('Blogs', schema);
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.post("/api",async(req,res)=>{
  //const data=req.body.name;
  
  doc=req.body.formData;
  const data=new Blogs({
    name:doc.name,
    rno:doc.rno,
    blogtitle:doc.title,
    blogcontent:doc.content,
    likes:doc.likes,
    dislikes:doc.dislikes,
  });
  data.save();
  console.log("data in server:",req.body.formData.name);
});



app.get("/data", async (request, response) => {
  const foods = await Blogs.find({});
  response.json(foods);

  //console.log(foods);
});

app.post("/increase",async(request,response)=>{
  const id=request.body.id;
  console.log(id);
  
await Blogs.updateOne({_id :id}, {$inc : {likes : 1}})
.then((res)=>{
  console.log(res);
});

console.log("Updated");
  
});

app.post("/decrease",async(request,response)=>{
  const id=request.body.id;
  console.log(id);
  
await Blogs.updateOne({_id :id}, {$inc : {dislikes : 1}})
.then((res)=>{
  console.log(res);
});

console.log("Updated");
  
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});