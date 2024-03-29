import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    roles: {
      type: [String],
      enum: ["ADMIN_ROLE", "USER_ROLE"],
      default: ["USER_ROLE"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model("User", userSchema);
