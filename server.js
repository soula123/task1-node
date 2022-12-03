const http = require("http");
const fs = require('fs');
const { toNamespacedPath } = require("path");

let users = [
    {
        id:'16',
        name:'Dahmen'
    },
    {
        id:'2',
        name:'IFA'
    },
    {
        id:'3',
        name:'TALBI'
    },
    {
        id:'4',
        name:'MERIEH'
    },
    {
        id:'7',
        name:'MSEKNI'
    }
]
const server = http.createServer((req,res)=>{
    request = req.url.split("/");

    if(req.url =='/favicon.ico'){
        res.statusCode = 401
        res.end()
    }
    
    //read all ken l fichier exist sinon y9oli msh mawjoud
    else if (request[2] == "all" && req.method.toLocaleLowerCase() == "get") {
        let exist = fs.existsSync("names.txt", (exist) => {
          return exist;
        });
        if (exist)
          fs.readFile("names.txt", "utf8", (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            names = data.split("\n");
            res.setHeader("content-type", "text/html");
            res.write("<ul>");
            names.forEach((user) => {
              res.write(`<li>${user}</li>`);
            });
            res.write("</ul>");
            res.end();
          });
        else {
          res.write("read cannot execute");
          res.end();
        }
        
        
    }
    // reset w nverifi ken l file exist wale
    if (request[1] == "users") {
        if (request[2] == "reset") {
          let exist = fs.existsSync("names.txt", (exist) => {
            return exist;
          });
          if (exist) {
            fs.unlink("names.txt", function (err) {
              if (err) throw err;
              console.log("File deleted!");
            });
            res.end();
          } else {
            res.write("delete cannot execute");
            res.end();
          }
        }
    // ajouter
    else 
    if (request[2] == "ajouter") {
        let name = request[3];
        fs.appendFile("names.txt", name + "\n", function (err) {
          if (err) throw err;
          console.log("Saved!");
        });
        res.write(`ajoutina ${name} fel fichier`);
        res.end();
      } 
      else {
        res.write(`${req.url} is not supported`);
        res.end();
      } } 
      
      else {
      res.write(`${req.url} is not supported`);
      res.end();
    } 
    
});

server.listen(8000)