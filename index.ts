import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.fnmec.mongodb.net/cinereels`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Connected to mongoose');
    } catch (error) {
        throw new Error('Error connecting to database!');
    }

    const port = process.env.PORT || 2000;

    app.listen(port, () => {
        console.log('Listening on port:' + port);
    });
}

start();