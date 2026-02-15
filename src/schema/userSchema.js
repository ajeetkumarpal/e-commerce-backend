import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is mandatory"] },
    email: {
      type: String,
      trim: true,
      required: [true, "email is mandatory"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is mandatory"],
    },
    cardData: { type: Object, default: {} },
  },
  { timestamps: true, minimize: false },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const user = mongoose.model("User", userSchema);
export default user;
