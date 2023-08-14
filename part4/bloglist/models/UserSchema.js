import mongoose from 'mongoose';

class UserSchema extends mongoose.Schema {
    constructor() {
        const blogSchemaDefinition = {
            username: {
                type: String,
                required: true,
            },
            name: String,
            passwordHash: {
                type: String,
                required: true,
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
