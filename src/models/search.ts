import mongoose from 'mongoose';

interface SearchAttr {
    text: string;
    user: string;
};

interface SearchModel extends mongoose.Model<SearchDoc> {
    build(attr: SearchAttr): SearchDoc;
};

interface SearchDoc extends mongoose.Document {
    text: string;
    user: string;
}

const searchSchema = new mongoose.Schema({
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
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
});

searchSchema.statics.build = (attrs: SearchAttr) => {
    return new Search(attrs);
}

const Search = mongoose.model<SearchDoc, SearchModel>('Search', searchSchema);

export { Search };