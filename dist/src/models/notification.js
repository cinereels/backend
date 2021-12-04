"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
var notificationSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
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
notificationSchema.statics.build = function (attrs) {
    return new Notification(attrs);
};
var Notification = mongoose_1.default.model('Notification', notificationSchema);
exports.Notification = Notification;
