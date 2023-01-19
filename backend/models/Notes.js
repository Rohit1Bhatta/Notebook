const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        unique: false
        
    },

    tag: {
        type: String,
        default: "General",
        
    },
        date:{
            type: Date,
            default: Date.now,
        },


}
);
 
module.exports= mongoose.model("Notes",NotesSchema);

