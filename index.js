const express=require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);
var path=require('path');
const socketio=require('socket.io');
const io=socketio(server);
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
io.on('connection',(socket)=>{
    socket.on("send-location", function(data){
        io.emit("receive-location",{id: socket.id, ...data});
    })
    socket.on("disconnect", function(){
    io.emit("user-disconnected",socket.id);
    })

    console.log("connected");

});

app.get("/",(req,res)=>{
    res.render('index');
})
server.listen(3000);




