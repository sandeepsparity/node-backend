const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
// const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    user_image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        default: "user",
    },
    profession: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordRestExpires: Date,
    stripe_account_id: String,
    stripe_seller: {},
    stripeSession: {},
},
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
});

userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//       next();
//     }
//     const salt = await bcrypt.genSaltSync(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   });
//   userSchema.methods.isPasswordMatched = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model("User", userSchema);
