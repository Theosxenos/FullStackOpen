const BlogValidation = {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['title', 'author'],
            properties: {
                title: { bsonType: 'string' },
                author: { bsonType: 'string' },
                url: { bsonType: 'string' },
                likes: { bsonType: 'int' },
            },
        },
    },
};

export default BlogValidation;
