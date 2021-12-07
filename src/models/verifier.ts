import mongoose from 'mongoose';

interface VerifierAttr {
    email: string;
    code: string;
};

interface VerifierModel extends mongoose.Model<VerifierDoc> {
    build(attr: VerifierAttr): VerifierDoc;
};

interface VerifierDoc extends mongoose.Document {
    email: string;
    code: string;
}

const verifierSchema = new mongoose.Schema({
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
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
});

verifierSchema.statics.build = (attrs: VerifierAttr) => {
    return new Verifier(attrs);
}

const Verifier = mongoose.model<VerifierDoc, VerifierModel>('Verifier', verifierSchema);

export { Verifier };