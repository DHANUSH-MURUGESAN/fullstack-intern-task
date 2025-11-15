const menuModel = require("../models/menumodels")

const menuGetController = async(req, res) => {
    try{
        const result = await menuModel.find();
        res.status(200).json(result)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { menuGetController }
