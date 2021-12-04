import mongoose from 'mongoose';

interface UserAttr {
    email: string;
    password: string;
    color: number;
    isAdmin: boolean;
};

interface UserModel extends mongoose.Model<UserDoc> {
    build(attr: UserAttr): UserDoc;
};

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    color: number;
    isAdmin: boolean;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    color: {
        type: Number,
        required: true,
        default: 0,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps: true,
});

userSchema.statics.build = (attrs: UserAttr) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };