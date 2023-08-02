var express=require("express");
var admin = require("firebase-admin");
var keys=require("./keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});
var db=admin.firestore();

var app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/mostrar",async(req,res)=>{
    try{
        var usuarios=await db.collection("miejemploBD").get();
            usuarios.forEach(usuario => {
                console.log(usuario.data());
            });
        res.send("Ver la consola :) ");
    }
    catch(err){
        console.log("Error al mostrar los usuario ...... "+err);
        res.send("Error al mostrar los usuario ...... "+err);
    }
})

var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Servidor en http://localhost:3000");
});

app.get("/modificar", async(req,res)=>{
    try{
        data={
            id:300,
            nombre:"Jos",
            usuario:"jos",
            password:"jos"
        }
        await db.collection("miejemploBD").doc(data.id.toString()).set(data);
        console.log("Registro insertado");
        res.redirect("/mostrar");
    }
    catch(err){
        console.log("error al registrar nuevo usuario ...... "+err);
    }
});

app.get("/nuevo", async(req,res)=>{
    try{
        data={
            id:500,
            nombre:"Borrar",
            usuario:"borrar",
            password:"borrar"
        }
        await db.collection("miejemploBD").doc(data.id.toString()).set(data);
        console.log("Registro insertado");
        res.redirect("/mostrar");
    }
    catch(err){
        console.log("error al registrar nuevo usuario ...... "+err);
    }
});

app.get("/borrar", async(req,res)=>{
    try{
        await db.collection("miejemploBD").doc("500").delete();
        console.log("Registro borrado");
        res.redirect("/mostrar");
    }
    catch(err){
        console.log("error al registrar nuevo usuario ...... "+err);
    }
});