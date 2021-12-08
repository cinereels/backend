import mongoose from 'mongoose';

interface MovieAttr {
    name: string;
    description: string;
    video: string;
    genre: string;
    gallery: string[];
    imdb: string;
    rt: string;
};

interface MovieModel extends mongoose.Model<MovieDoc> {
    build(attr: MovieAttr): MovieDoc;
};

interface MovieDoc extends mongoose.Document {
    name: string;
    description: string;
    video: string;
    genre: string;
    gallery: string[];
    imdb: string;
    rt: string;
}

const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        ref: 'Video',
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    gallery: [{
        type: String,
        ref: 'Gallery',
        required: false,
    }],
    imdb: {
        type: String,
        required: false,
    },
    rt: {
        type: String,
        required: false,
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

MovieSchema.statics.build = (attrs: MovieAttr) => {
    return new Movie(attrs);
}

const Movie = mongoose.model<MovieDoc, MovieModel>('Movie', MovieSchema);

export { Movie };