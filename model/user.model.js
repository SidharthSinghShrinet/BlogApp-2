import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username must be at most 20 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  console.log(hashedPassword);
  this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  const result = await bcrypt.compare(enteredPassword, this.password);
  return result;
};

export default mongoose.models.User || mongoose.model("User", userSchema);
