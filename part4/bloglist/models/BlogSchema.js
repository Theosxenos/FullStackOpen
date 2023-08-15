/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

class BlogSchema extends mongoose.Schema {
    constructor() {
        const blogSchemaDefinition = {
            title: {
                type: String,
                required: true,
            },
            author: String,
            url: {
                type: String,
                required: true,
            },
            likes: Number,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        };

        super(blogSchemaDefinition);

        // this.addUniqueValidator();
        this.addTransformToJSON();
    }

    addTransformToJSON() {
        this.set('toJSON', {
            transform: (document, returnedObject) => {
                const newObject = { ...returnedObject };

                newObject.id = returnedObject._id.toString();
                delete newObject._id;
                delete newObject.__v;

                return newObject;
            },
        });
    }
}

// eslint-disable-next-line new-cap
const BlogModel = new mongoose.model('Blog', new BlogSchema());
export default BlogModel;
