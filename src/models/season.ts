import mongoose from 'mongoose';

interface SeasonAttr {
    seasonNo: number;
    description: string;
    episodes: string[];
    gallery: string[];
};

interface SeasonModel extends mongoose.Model<SeasonDoc> {
    build(attr: SeasonAttr): SeasonDoc;
};

interface SeasonDoc extends mongoose.Document {
    seasonNo: number;
    description: string;
    episodes: string[];
    gallery: string[];
}

const seasonSchema = new mongoose.Schema({
    seasonNo: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    episodes: [{
        type: String,
        ref: 'Episode',
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

seasonSchema.statics.build = (attrs: SeasonAttr) => {
    return new Season(attrs);
}

const Season = mongoose.model<SeasonDoc, SeasonModel>('Season', seasonSchema);

export { Season };