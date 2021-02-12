var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var cors = require('cors');
var app = express();

// Body Parser Middleware
app.use(bodyParser.json());
app.use(cors());

//Initializing connection string
var dbConfig = {
    user: "root",
    password: "",
    server: "localhost",
    database: "rs2_assignment"
};
var connection = mysql.createConnection(dbConfig);
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log("Error connecting database");
    }
});

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});


// user login
app.post("/api/v1/login", function (req, res) {
    const { loginName, password } = req.body;
    connection.query(`select * from user where loginName = '${loginName}' and password = '${password}'`, function (err, results, fields) {
        if (err) {
            res.send({
                "status": 400,
                "failed": "error ocurred"
            })
        } else {
            if (results.length > 0) {
                res.send({
                    "status": 200,
                    "message": "login sucessfull",
                    "result": results[0]
                })
            } else {
                res.send({
                    "status": 400,
                    "message": "username or password invalid"
                })
            }
        }
    })
});

//search product
app.get('/api/v1/search', function (req, res) {
    const productName = req.query.productName || '';
    const type = req.query.type || '';
    let query;
    if (productName && type) {
        query = `select * from product where name like '%${productName}%' AND type = '${type}'`
    } else if (productName && !type) {
        query = `select * from product where name like '%${productName}%'`
    } else {
        query = `select * from product where type = '${type}'`
    }
    connection.query(query, function (err, results, fields) {
        console.log(err)
        if (err) {
            console.log(err)
            res.send({
                "status": 400,
                "failed": "error ocurred"
            })
        } else {
            if (results.length > 0) {
                res.send({
                    "status": 200,
                    "message": "Result available",
                    "result": results
                })
            } else {
                res.send({
                    "status": 200,
                    "message": 'Result not available',
                    "result": []
                })
            }
        }
    })

})

// get all product for a user
app.post('/api/v1/products', function (req, res) {
    const userId = req.body.userId;
    connection.query(`select cart.id, cart.qty, cart.productId, product.name, product.type, product.description from cart inner join product on cart.productId = product.id  where userId = '${userId}'`, function (err, results, fields) {
        if (err) {
            res.send({
                "status": 400,
                "failed": "error ocurred"
            })
        } else {
            if (results.length > 0) {
                res.send({
                    "status": 200,
                    "message": "Result available",
                    "result": results
                })
            } else {
                res.send({
                    "status": 200,
                    "message": 'Result not available',
                    "result": []
                })
            }
        }
    })
})

// Add product to the cart
app.post('/api/v1/addtocart', function (req, res) {
    const productId = req.body.productId
    const userId = req.body.userId
    const qty = req.body.qty
    connection.query(`insert into cart (productId, userId, qty) values (${productId}, ${userId}, ${qty})`, function (err, results, fields) {
        if (err) {
            res.send({
                "status": 400,
                "failed": "error ocurred"
            })
        } else {
            res.send({
                "status": 200,
                "message": "Added to cart"
            })
        }
    })
})

// Remove an item from the cart
app.post('/api/v1/removeFromcart', function (req, res) {
    const id = req.body.id;
    connection.query(`DELETE FROM cart WHERE cart.id = ${id}`, function (err, result, fields) {
        if (err) {
            res.send({
                status: 400,
                failed: 'error occured'
            })
        } else {
            res.send({
                status: 200,
                message: 'Item removd from cart'
            })
        }
    })
})

