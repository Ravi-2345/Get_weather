const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const query=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=d32ab15a4530f9c1261d7d7d5014b6d5"
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const WeatherData=JSON.parse(data);
      const temp=WeatherData.main.temp
      const w_des=WeatherData.weather[0].description
      const icon=WeatherData.weather[0].icon
      const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p>The weather is currently " + w_des+" </p>");
      res.write("<h1>The temperature in "+query+" is"+ temp +" degree celsius. </h1>");
      res.write("<img src=" + imageUrl + ">");

      res.send()
    })
  })
})

app.listen(3000,function(){
  console.log("server is running on port 3000");
});
