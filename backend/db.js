const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://sarevalasab:MyfirstMongoDbProject@cluster0.cutlj4u.mongodb.net/sodaSplash';  // Replace with your MongoDB URI including the database name

const mongoDb = async () => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        // Switch to the specific database 'sodaSplash'
        const db = mongoose.connection.useDb('sodaSplash');

        // Verify and log the database name
        console.log(`Using database: ${db.name}`);

        
        // Get the collection
        const fetched_data = db.collection('Items_data');
        const fetched_category = db.collection('category');

        // Fetch all documents in the collection
        global.itemsdata = await fetched_data.find({}).toArray();
        global.catdata = await fetched_category.find({}).toArray();

        // Log the fetched data

        // Return the fetched data
        
    } catch (err) {
        console.error("Error:", err);
        throw err; // Rethrow the error for handling in the calling function
    }
};

module.exports = mongoDb;
