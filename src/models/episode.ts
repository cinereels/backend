import mongoose from 'mongoose';

interface EpisodeAttr {
    episodeNo: number;
    video: string;
    gallery: string[];
};

interface EpisodeModel extends mongoose.Model<EpisodeDoc> {
    build(attr: EpisodeAttr): EpisodeDoc;
};

interface EpisodeDoc extends mongoose.Document {
    episodeNo: number;
    video: string;
    gallery: string[];
}

const episodeSchema = new mongoose.Schema({
    episodeNo: {
        type: Number,
        required: true,
    },
    video: {
        type: String,
        ref: 'Video',
        required: true,
    },
    gallery: [{
        type: String,
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

episodeSchema.statics.build = (attrs: EpisodeAttr) => {
    return new Episode(attrs);
}

const Episode = mongoose.model<EpisodeDoc, EpisodeModel>('Episode', episodeSchema);

export { Episode };