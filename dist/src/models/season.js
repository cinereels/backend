"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Season = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
var seasonSchema = new mongoose_1.default.Schema({
    seasonNo: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    episodes: [{
            type: String,
            ref: 'Episode',
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
seasonSchema.statics.build = function (attrs) {
    return new Season(attrs);
};
var Season = mongoose_1.default.model('Season', seasonSchema);
exports.Season = Season;
