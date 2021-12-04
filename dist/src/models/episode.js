"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episode = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
var episodeSchema = new mongoose_1.default.Schema({
    episodeNo: {
        type: Number,
        required: true,
    },
    video: {
        type: String,
        ref: 'Video',
        required: true,
    },
    gallery: [{
            type: String,
            required: false,
        }],
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
episodeSchema.statics.build = function (attrs) {
    return new Episode(attrs);
};
var Episode = mongoose_1.default.model('Episode', episodeSchema);
exports.Episode = Episode;
