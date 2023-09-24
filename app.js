const express = require("express");
const path = require("path"); 
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const port = 8001;


//Define contactSchema
const contactSchema = new mongoose.Schema({
    name: String,
    email:String,
    number:String,
    age:String,
    gender:String 
  });

  const contact = mongoose.model('contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }))

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{ 
    // const params = { }
    res.status(200).render('home.pug');
})

// Contact Data Saved into Database
app.get("/contact", (req, res)=>{ 
    res.status(200).render('contact.pug');
});
app.post('/contact',(req,res)=>{
var myData= new contact(req.body);
myData.save().then(()=>{
  //  res.send("your data has been saved to database")
    //if you want to show page after sucessfull form submit use below page
     res.status(200).render('contact.pug');
}).catch(()=>{
    res.status(400).send("Your data not saved")
})
})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});