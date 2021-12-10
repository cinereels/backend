import mongoose from 'mongoose';

interface ChannelAttr {
    channelNo: number;
    name: string;
    gallery: string[];
    live: boolean;
    genre: string;
    video: string;
};

interface ChannelModel extends mongoose.Model<ChannelDoc> {
    build(attr: ChannelAttr): ChannelDoc;
};

interface ChannelDoc extends mongoose.Document {
    name: string;
    channelNo: number;
    gallery: string[];
    live: boolean;
    genre: string;
    video: string;
}

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    channelNo: {
        type: Number,
        required: true,
    },
    gallery: [{
        type: String,
        ref: 'Gallery',
        required: false,
    }],
    live: {
        type: Boolean,
        required: true,
        default: false,
    },
    genre: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        ref: 'Video',
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

channelSchema.statics.build = (attrs: ChannelAttr) => {
    return new Channel(attrs);
}

const Channel = mongoose.model<ChannelDoc, ChannelModel>('Channel', channelSchema);

export { Channel };