"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Series = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
var seriesSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    seasons: [{
            type: String,
            ref: 'Season',
            required: false,
        }],
    gallery: [{
            type: String,
            ref: 'Gallery',
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
seriesSchema.statics.build = function (attrs) {
    return new Series(attrs);
};
var Series = mongoose_1.default.model('Series', seriesSchema);
exports.Series = Series;
