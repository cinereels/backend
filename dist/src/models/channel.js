"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
var channelSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    channelNum: {
        type: Number,
        required: true,
    },
    gallery: [{
            type: String,
            ref: 'Gallery',
            required: false,
        }],
    showUrl: {
        type: String,
        required: true,
    },
    live: {
        type: Boolean,
        required: true,
        default: false,
    }
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
channelSchema.statics.build = function (attrs) {
    return new Channel(attrs);
};
var Channel = mongoose_1.default.model('Channel', channelSchema);
exports.Channel = Channel;
