import { Schema, model, Types } from 'mongoose';

const gameSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [4, 'Name should be at least four characters.'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Game image should start with http:// or https://'],
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price should be positive number']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be a minimum of 10 characters long'],
    },
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [2, 'Genre should be a minimum of 2 characters long'],
    },
    platform: {
        type: String,
        required: [true, 'Platform is required!'],
        enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX']
    },
    boughtBy: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    }
});