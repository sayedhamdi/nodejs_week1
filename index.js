
const app = require("express")();
const bodyParser = require("body-parser")
const Joi = require("joi")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
const names = [
    {id:1,name:"Motez"},
    {id:2,name:"aziz"},
    {id:3,name:"meher"}
]
app.get('/',(req,res)=>{
    const r = {"name":"Motez"}
    res.send(JSON.stringify(r));
})

app.get('/hello',(req,res)=>{
    
    const r = {"name":"Motez"}
    response.send("hello");
})
app.get('/api/names',(req,res)=>{
    res.send(JSON.stringify(names))
})
app.get('/api/names/:id',(req,res)=>{
   const id= req.params.id

   const name  = names.find((n=>{
    if (n.id == id){return n}})) 
   if (!name){
       res.status(404).send({"error":"name not found"})
   }
   res.status(200).send(JSON.stringify(name))
})
app.post("/api/names/",(req,res)=>{
    //validation of data
    const nameSchema = Joi.object({
        name : Joi.string().min(4).max(16).required()
    }) 
    const validation = nameSchema.validate(req.body)
    if (validation.error){
        res.status(400).send(JSON.stringify(validation.error))
    }
    const name = {
        id : names.length+1,
        name:req.body.name
    } 
    names.push(name)
    res.send(JSON.stringify(name))

})




const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`running on port ${port}...`)
})