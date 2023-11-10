import express from "express";
import mongoose from "mongoose";

const app = express();

const db = await mongoose.connect("mongodb://mongodb/dockerdb");
console.log(db.connection.db.databaseName);

const ProductSchema = new db.Schema({
  name: String,
});

const ProductModel = db.model("Product", ProductSchema);

app.get("/", async (req, res) => {
  const newProduct = new ProductModel({
    name: "laptop",
  });

  await newProduct.save();

  const listProducts = await ProductModel.find();

  res.json({
    listProducts,
  });
});

app.listen(3000);
console.log(`Server on port 3000`);
