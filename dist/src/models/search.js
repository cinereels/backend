"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
var searchSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        ref: 'User',
        required: true,
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
searchSchema.statics.build = function (attrs) {
    return new Search(attrs);
};
var Search = mongoose_1.default.model('Search', searchSchema);
exports.Search = Search;
