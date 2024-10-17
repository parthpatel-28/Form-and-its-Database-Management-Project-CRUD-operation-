import express from "express";
import bodyParser from "body-parser"; //middleware import
import pg from "pg"

/////////////////////////////////////////////////////////////////////////
import {dirname} from "path";    //import for location of file to be send
import {fileURLToPath} from "url"; //import for location of file to be send
import { hostname } from "os";
const _dirname = dirname(fileURLToPath(import.meta.url)); //const for location of file to be send
/////////////////////////////////////////////////////////////////////////////



const app = express();
const port = 3000;

////////////////////////////DATABASE CONNECTION///////////////////////////////////

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "parth2822",
    port: 5432,
  });
  

db.connect(
    console.log("connected")
);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const result = await db.query("SELECT * FROM users");


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var data = [];


app.use(bodyParser.urlencoded({ extended: true })); // bodyparser middleware use method

app.use(express.static("public")); //for using 


    








//variables

var name = "";
var email= "";
var gender= "";



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
app.get("/" ,  (req, res) =>{
    
    //res.sendFile(_dirname + "/index.html");
res.render("index.ejs");


})
//////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////
app.post("/submit" , async  (req,res) =>{

name = req.body["name"];
email = req.body["email"];
gender = req.body["gender"];
console.log(gender);
res.render("submitted.ejs");

//await db.query("INSERT INTO users(id,name)VALUES(7,'Meet')");
await db.query("INSERT INTO users(name,email,gender)VALUES($1,$2,$3)",[name,email,gender]);

console.log(result.rows[0]);
});
////////////////////////////////////////////////////////////////////////////////////////////////////

//data = db.query('SELECT * FROM users');
//db.query("INSERT INTO users(,name,email,gender)VALUES($1,$2,$3)," ["jeet','jeet34@gmail.com' ,'Male']);

//console.log(result.rows);




//////////////////////////////////////////////////////////////////
app.get("/view" , async (req,res) =>{

    const result = await db.query("SELECT * FROM users ORDER BY id ASC ");
    res.render("table.ejs" , {

     data: result
    

    });
   // for(let i=1; i< result.rows.length; i ++ ){
     //   console.log(result.rows[i].id);
    //}

    
});
////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////EDIT BUTTON AND PAGE/////////////////////////////////////////////////////
app.get("/edit/:id" , async (req,res) =>{
    const result = await db.query("SELECT * FROM users ORDER BY id ASC " );
const edit_id = parseInt(req.params.id);
console.log(edit_id);
res.render("edit.ejs" , {
data : result ,
id : edit_id
});


})

////////////////////////////////
app.post("/edit_submit/:id" , async  (req,res) =>{

    name = req.body["name"];
    email = req.body["email"];
    gender = req.body["gender"];
    console.log(gender);
    const edit_id = parseInt(req.params.id) ;
    
    //await db.query("INSERT INTO users(id,name)VALUES(7,'Meet')");
    await db.query("UPDATE users SET name=$1, email=$2 , gender=$3 WHERE id =$4",[name,email,gender,edit_id]);
    
    res.render("submitted.ejs"); 
    console.log(result.rows[0]);
    });



/////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/delete/:id" , async (req,res) =>{

    const delete_id = parseInt(req.params.id) ;
    console.log(delete_id);
    await db.query("DELETE FROM users WHERE id = $1",[delete_id]);
   
  const result = await db.query("SELECT * FROM users");
   
    res.render("table.ejs" , {

        data: result
       
   
       }
    );
    


    })
    


    const result2 = await db.query("SELECT * FROM users");
    for(let i=0 ; i <3 ;i++){
console.log(result2.rows[i]);
    }




    app.get("/delete34/:id" , async (req,res) =>{

        const delete_id = parseInt(req.params.id) ;
        console.log(delete_id);
        await db.query("DELETE FROM users WHERE id = $1",[delete_id]);
       
        result2 = await db.query("SELECT * FROM users");
       res.render("index.ejs" );
       db.end();    
    })    
    










app.listen( port , () =>{

    console.log(`Server running on port ${port}`);
    
    } )