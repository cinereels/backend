"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verifier = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
var verifierSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
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
verifierSchema.statics.build = function (attrs) {
    return new Verifier(attrs);
};
var Verifier = mongoose_1.default.model('Verifier', verifierSchema);
exports.Verifier = Verifier;
