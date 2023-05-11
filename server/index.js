const express = require('express');
const mongoose =require('mongoose');
const app=express();
const cors=require('cors');
app.use(express.json());
app.use(cors());

const PLayerModel = require("./models/player")

mongoose.connect("mongodb://127.0.0.1:27017/football",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.post('/insert',async (req,res)=>{
    const id=req.body.uniqueId;
    const Name=req.body.Name;
    const Age=req.body.Age;
    const Team=req.body.Team;
    const player=new PLayerModel({uniqueId:id,Name : Name,Age:Age,Team:Team});
    try {
        await player.save();
        res.send("Data Inserted")
    } catch (error) {
        res.send(error);
    }
});
app.post('/delete', async (req, res) => {
    const id = req.body.uniqueId;
    console.log(id);
    try {
      const deletedPlayer = await PLayerModel.findOneAndDelete({ uniqueId: id });
      res.send(`Deleted player: ${deletedPlayer}`);
    } catch (error) {
      console.error(error);
    }
  });
app.put('/update',(req,res)=>{
    const id=req.body.uniqueId;
    const Name=req.body.Name;
    const Age=req.body.Age;
    const Team=req.body.Team;
    PLayerModel.findOne({ uniqueId: id }).then((document) => {
        if(Name){
            document.Name=Name;
        }
        if(Age){
            document.Age=Age;
        }
        if(Team){
            document.Team=Team;
        }
        document.save();
      })
      .catch((err) => console.error('Error finding document:', err));
});
app.get('/read', async (req, res) => {
    try {
      const data = await PLayerModel.find({  });
      console.log(data);
      res.send(data);
    } catch (err) {
      console.error(err);
    }
  });


app.listen(3001,()=>{
    console.log("server running...");
});