var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
   serverOn();
   // afterConnection();

   showInventory();
  // orderStart();

});

function serverOn()
{
console.log("Store Live!");
console.log("Below are the products available for sale on Bamazon.");
console.log("-----------------------------------------");
};


function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};

function showInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id + " | " + "Item: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: $" + res[i].price + " | " + "Quantity Available: " + res[i].stock_quantity);

    }
    console.log("-----------------------------------");
    orderStart();
  });
};

function orderStart() {
  inquirer
    .prompt([
      {
      name: "purchaseId",
      type: "input",
      message: "What is the ID of the product you wish to buy?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      },
      {
        name: "orderAmount",
        type: "input",
        message: "How many units of the product would you like to buy?",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
      }
    ])
    .then(function(answer)
      {

      let productID = answer.purchaseId;
      let quantity = answer.orderAmount;
    //  console.log(productID);
    //  console.log(quantity);
      connection.query("SELECT * FROM products WHERE item_id=?", [productID], function(err, productResult) {
      if(err) throw err;

    //  console.log("After query:" + productResult[0].stock_quantity);

        if (quantity > productResult[0].stock_quantity)
        {
        console.log("Insufficient quantity of " + productResult[0].product_name + " for your order amount!");
        }
        else
        {
        let newStock = productResult[0].stock_quantity - quantity;
        placeOrder(productID, newStock, quantity, productResult[0].price);
        };

      });



      });

  };

  function placeOrder(productID, newStock, quantity, price)
  {
    connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
      stock_quantity: newStock
      },
      {
      item_id: productID
      }

    ],
    function(error) {
      if (error) throw err;

      var totalPrice = quantity * price;

      console.log("Order Placed Succesfully!");
      console.log("The total for your order is: $" + totalPrice);
    });


  };
