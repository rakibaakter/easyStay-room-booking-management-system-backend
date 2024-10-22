"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    rent: {
        type: Number,
        required: true,
    },
    facilities: {
        type: [String],
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["available", "unavailable"],
        default: "available",
    },
});
exports.Room = (0, mongoose_1.model)("Room", roomSchema);
