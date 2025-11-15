const productModel = require("../models/productmodels")

// const productCreateController = async(req, res) => {
//     try{
//         const productData = req.body
//         if(req.file){
//             productData.image = req.file.filename
//         }
//         console.log("menu", productData)
//         const storeMenu = new productModel(productData)
//         await storeMenu.save()
//         res.status(201).send("Menu created successfully")
//     }
//     catch(error){
//         res.status(500).send("Error when creating menu")
//     }
// }

const productCreateController = async (req, res) => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.image = req.file.filename;
    }

    console.log("menu", productData);

    const storeMenu = new productModel(productData);
    await storeMenu.save();

    res.status(201).json({
      data: storeMenu,
      message: "Menu created successfully",
    });
  } catch (error) {
    console.error("Error creating menu:", error);
    res.status(500).json({ error: "Error when creating menu" });
  }
};

const productShowController = async(req, res) => {
    try{
        // const id = req.params.id
        // const menuData = await menuModel.findById(id)
        const productData = await productModel.find()
        res.status(200).send({message:"Menu displayed successfully", data:productData})
    }
    catch(error){
        res.status(500).send("Error when displayed menu")
    }
}

const productUpdateController = async(req, res) => {
//     try{
//         // const {recipe, price} = req.body
//         // const menuData = await menuModel.findOneAndUpdate({recipe:recipe},{price:price},{new:true})
//         const {id} = req.params;
//         const updatedData = req.body;
//         if(req.file){
//             updatedData.image = req.file.filename
//         }
//         const productData = await productModel.findByIdAndUpdate(id, {...updatedData}, {new:true})
//         return res.status(200).send({message:"Menu updated successfully", data:productData})
//     }
//     catch(error){
//         res.status(500).send("Error when updating menu")
//     }
// }
try {
    const { id } = req.params;
    const updatedData = req.body;

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const productData = await productModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Menu updated successfully",
      data: productData,
    });
  } catch (error) {
    console.log("Update error:", error);
    res.status(500).json({ message: "Error when updating menu", error });
  }
};

const productDeleteController = async(req, res) => {
    try{
        const id = req.params.id
        const productData = await productModel.findByIdAndDelete(id)
        res.status(200).send({message:"Menu deleted successfully", data:productData})
    }
    catch(error){
        res.status(500).send("Error when deleting menu")
    }
}


module.exports = {
    productCreateController,
    productShowController,
    productUpdateController,
    productDeleteController
}