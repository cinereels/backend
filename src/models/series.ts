import mongoose from 'mongoose';

interface SeriesAttr {
    name: string;
    description: string;
    genre: string;
    seasons: string[];
    gallery: string[];
};

interface SeriesModel extends mongoose.Model<SeriesDoc> {
    build(attr: SeriesAttr): SeriesDoc;
};

interface SeriesDoc extends mongoose.Document {
    name: string;
    description: string;
    genre: string;
    seasons: string[];
    gallery: string[];
}

const seriesSchema = new mongoose.Schema({
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
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
});

seriesSchema.statics.build = (attrs: SeriesAttr) => {
    return new Series(attrs);
}

const Series = mongoose.model<SeriesDoc, SeriesModel>('Series', seriesSchema);

export { Series };