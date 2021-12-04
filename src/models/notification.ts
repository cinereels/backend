import mongoose from 'mongoose';

interface NotificationAttr {
    title: string;
    description: string;
    gallery: string[];
};

interface NotificationModel extends mongoose.Model<NotificationDoc> {
    build(attr: NotificationAttr): NotificationDoc;
};

interface NotificationDoc extends mongoose.Document {
    title: string;
    description: string;
    gallery: string[];
}

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
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

notificationSchema.statics.build = (attrs: NotificationAttr) => {
    return new Notification(attrs);
}

const Notification = mongoose.model<NotificationDoc, NotificationModel>('Notification', notificationSchema);

export { Notification };