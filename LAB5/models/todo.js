// models/Todo.js
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      index: true, // 🔍 indexing on title
    },
    description: {
      type: String,
      default: "No description provided",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ⚡ Virtual Property: auto-generated summary
todoSchema.virtual("summary").get(function () {
  return `${this.title} - ${this.completed ? "Done ✅" : "Pending ⏳"}`;
});

// 🧩 Pre-save Trigger (Mongoose middleware)
todoSchema.pre("save", function (next) {
  console.log(`🪄 About to save Todo: "${this.title}"`);
  next();
});

// 🧩 Post-save Trigger
todoSchema.post("save", function (doc) {
  console.log(`✨ Todo Saved Successfully: "${doc.title}"`);
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;