import mongoose from 'mongoose';

interface VideoAttr {
    title: string;
    duration: string;
    description: string | undefined;
    url: string;
};

interface VideoModel extends mongoose.Model<VideoDoc> {
    build(attr: VideoAttr): VideoDoc;
};

interface VideoDoc extends mongoose.Document {
    title: string;
    duration: string;
    description: string | undefined;
    url: string;
}

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    url: {
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

videoSchema.statics.build = (attrs: VideoAttr) => {
    return new Video(attrs);
}

const Video = mongoose.model<VideoDoc, VideoModel>('Video', videoSchema);

export { Video };