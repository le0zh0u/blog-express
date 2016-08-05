# blog-express
a blog by express


---
Recently, I Read a book named *Node.js实战*. It is written by *赵坤* and more. In the book, The first chapter is How to use Express and MongoDB to build multi-poeple blog. 
But when I copy from the book, I still get stuck. So I write it down and put the solutions here.

---

## Use MongoDB

### What is MongoDB

Wikipedia say:

> MongoDB(from humongous) is a free and open-source cross-platform document-oriented database.Classified as a NoSQL database, MongoDB avoids the traditional table-based relational database structure in favor of JSON-like documents with dynamic schemas(MongoDB calls the format BSON), making the intergration of data incertain types of applications easier and faster. MongoDB is developed by MongoDB Inc. and is free and open-source, published under a combination of the GNU Affero General Public License and the Apache License.

To me, it is a database which is NoSQL and supports JSON Type. And importantly the book uses it.:)

### Install MongoDB
   
Well, search in Google.

After install it, run MongoDB and use:

    mongod --dbpath blogPath/data/

In the Blog project, make directory named data where the blog data would put in. and set data folder path into .gitigore file.

---

### Use Session

I want to put Session data into MongoDB. So I need to install `express-session` and `connect-mongo` modules. But I don't want to use the version of modules just like content in the book. So I use:
    
    npm install express-session --save
    npm install connect-mongo --save
    
`--save` means install the dependency and save into `package.json`.

Then, I type the same codes from the book:
    
    app.use(session({
        resave:false,//添加这行
        saveUninitialized: true,//添加这行
        secret: settings.cookieSecret,
        key: settings.db, //cookie name
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, //cookie life 30 days
        store: new MongoStore({
            db: settings.db,
            host: settings.host,
            port: settings.port
        })
    }));

When I start the project, it failed. 

     Error: Connection strategy not found

I searched ,and find the interface of create a connection is changed. so I change it:
    
    store: new MongoStore({
            /*db: settings.db,
            host: settings.host,
            port: settings.port*/
            url: 'mongodb://localhost/blog'
        })
        
And luckily, it works.

---

## Use ejs

### What is ejs

Search Google.

### Grammar

Search Google.

---

### Use supervisor

Once I modify codes, I must to stop server and restart it. And `supervisor` module can fix this auto, when I save some codes, it will automatically restart application.
 
    npm install -g supervisor
    
    supervisor app
    
use `supervisor` to start app.js.

---

### Use flash

#### What is flash

#### How to use

---

### Some Error

#### Error: Module version mismatch. Expected 48, got 44.

Detail:
    
    Error: Module version mismatch. Expected 48, got 44.
        at Error (native)
        at Object.Module._extensions..node (module.js:568:18)
        at Module.load (module.js:458:32)
        at tryModuleLoad (module.js:417:12)
        at Function.Module._load (module.js:409:3)
        at Module.require (module.js:468:17)
        at require (internal/module.js:20:19)
        at Object.<anonymous> (XXX/blog-express/node_modules/.npminstall/bson/0.2.22/bson/ext/index.js:15:10)
        at Module._compile (module.js:541:32)
        at Object.Module._extensions..js (module.js:550:10)
        at Module.load (module.js:458:32)
        at tryModuleLoad (module.js:417:12)
        at Function.Module._load (module.js:409:3)
        at Module.require (module.js:468:17)
        at require (internal/module.js:20:19)
        at Object.<anonymous> (XXX/blog-express/node_modules/.npminstall/bson/0.2.22/bson/lib/bson/index.js:3:24)
    js-bson: Failed to load c++ bson extension, using pure JS version

I think maybe because of bson, so I remove bson and reinstall it, it doesn't work.

I remember that bson is one dependency for mongodb, so I reinstall mongodb, it works. 
    
