import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pets",
    },
});

export const adoptionModel = mongoose.model("adoptions", adoptionSchema);