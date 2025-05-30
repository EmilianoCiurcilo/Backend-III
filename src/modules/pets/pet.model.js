import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specie: {
        type: String,
        required: true
    },
    birthDate: Date,
    adopted:{
        type: Boolean,
        default: false,
    },
    image: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
})

export const petModel = mongoose.model("pets", petSchema);