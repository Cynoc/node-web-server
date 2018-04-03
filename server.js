const express=require('express');
const hbs=require('hbs');//allows us to render pages easily
const fs=require('fs');
const port= process.env.PORT || 3000;   //set by heroku or 3000 locally

var app=express();
//middleware lets you configure Express

hbs.registerPartials(__dirname +'/views/partials');// allows us to include s

app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log +'\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));// dirname links to current directly

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
//handle bars helpers enables us  run javascript code from inside our handle bars templates
//handle bars partials enables us to create reusable code like headers and footers

//setting http route handlers
//request stores headers body etc
//response contains methods for customization
app.get('/',(req,res)=>{
//  res.send('<h1> Hello Express !</h1>');
//sending JSON
res.render('home.hbs',{
  pageTitle:'Home Page',
  welcomeMessage:'Welcome to my awesome Website'

})
});


//new page baby
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
});


app.get('/project',(req,res)=>{
  res.render('project.hbs',{
    pageTitle:'Project Page',
    message:'Welcome to my portfolio page'
  });
});

// /bad when request fails, send back JSON with errorMessage

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to handle request'
  })
});
//heroku can set port

app.listen(port,() =>{
  console.log(`server is up on port ${port}`);
});
