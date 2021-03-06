import express, { Request, Response, NextFunction } from 'express';
import { Gallery } from '../../models/gallery';
import { GalleryType } from '../../utility/gallery-type';

const Router = express.Router();

Router.put('/api/gallery/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { imageUrl, videoUrl, caption, type } = req.body;
    
        let modifiedType = GalleryType.Image;
    
        if (type === 'video') {
            modifiedType = GalleryType.Video;
        }
    
        const gallery = await Gallery.findById(id);
    
        if (!gallery) {
            throw new Error('No such gallery exists!');
        }
    
        gallery.set({
            imageUrl, videoUrl, caption, type: modifiedType,
        });
    
        await gallery.save();
    
        res.status(204).send({
            message: 'gallery updated successfully',
            gallery,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as GalleryUpdateRouter };