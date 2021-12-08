"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
var MovieSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        ref: 'Video',
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    gallery: [{
            type: String,
            ref: 'Gallery',
            required: false,
        }],
    imdb: {
        type: String,
        required: false,
    },
    rt: {
        type: String,
        required: false,
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
});
MovieSchema.statics.build = function (attrs) {
    return new Movie(attrs);
};
var Movie = mongoose_1.default.model('Movie', MovieSchema);
exports.Movie = Movie;
