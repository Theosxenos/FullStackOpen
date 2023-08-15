import mongoose from 'mongoose';
import 'mongoose-unique-validator';

class UserSchema extends mongoose.Schema {
    constructor() {
        const blogSchemaDefinition = {
            username: {
                type: String,
                required: true,
                minLength: 3,
                unique: true,
            },
            name: String,
            passwordHash: String,
            blogs: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Blog',
                },
            ],
        };

        super(blogSchemaDefinition);

        // this.addUniqueValidator();
        this.addTransformToJSON();
    }

    addTransformToJSON() {
        this.set('toJSON', {
            transform: (document, returnedObject) => {
                const newObject = { ...returnedObject };
                // eslint-disable-next-line no-underscore-dangle
                newObject.id = returnedObject._id.toString();
                // eslint-disable-next-line no-underscore-dangle
                delete newObject._id;
                // eslint-disable-next-line no-underscore-dangle
                delete newObject.__v;
                delete newObject.passwordHash;

                return newObject;
            },
        });
    }
}

// eslint-disable-next-line new-cap
const UserModel = new mongoose.model('User', new UserSchema());
export default UserModel;
