const { generateToken } = require("../middleware/auth");
const userModel = require("../models/usermodels");
const bcrypt = require("bcrypt");

const userCreateController = async (req, res) => {
  try {
    const user = req.body;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const storeUser = await new userModel(user);
    await storeUser.save();
    res.status(201).json({ message: "User registered successfully" });
    //Instead of using .send, we can use .json for quick response
  } catch (error) {
    res.status(500).json("Error while creating account", error);
  }
};

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ message: "You are not registered" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, existUser.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Provide correct email and password" });
    }

    // Generate token
    const token = await generateToken(existUser._id);

    return res.status(200).json({
      message: "User login successful",
      data: { token },
      user: { 
        // existUser 
        _id: existUser._id,
        name: existUser.firstname,
        email: existUser.email,
        role: existUser.role,
        profilePhoto: existUser.profilePhoto
      },
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Error while user login" });
  }
};

const userShowController = async (req, res) => {
  try {
    const userId = req.user.id;
    const showUser = await userModel.findById(userId).select({ password: 0 });
    return res
      .status(200)
      .json({ message: "User profile created successfully", data: showUser });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Error while showing user profile" });
  }
};

const updateUserProfileController = async (req, res) => {
  try {
    const userId = req.params.id;

    // Collect fields
    const updateData = {};
    if (req.body.username) updateData.username = req.body.username;
    if (req.file) updateData.profilePhoto = req.file.filename;

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, { $set: updateData }, { new: true })
      .select("-password"); // don’t send password back

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Error while updating profile" });
  }
};

const getsingleuser = async (req, res) => {
  try {
    const userId = req.params.id;
    const existUser = await userModel.findById(userId);
    if (!existUser) {
      return res.status(404).json({ message: "You are not registered" });
    }
    res.status(200).json({
      message: "Get user successfully",
      existUser,
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Error while updating profile" });
  }
};

module.exports = {
  userCreateController,
  userLoginController,
  userShowController,
  updateUserProfileController,
  getsingleuser,
};
