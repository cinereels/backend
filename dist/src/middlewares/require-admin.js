"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
var requireAdmin = function (req, res, next) {
    // if (!req.currentUser?.isAdmin) {
    //     throw new Error("Not Admin!");
    // }
    next();
};
exports.requireAdmin = requireAdmin;
