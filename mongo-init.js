// Description: This file is used to initialize the database and create a new user for the webchat database.
db = db.getSiblingDB('admin');
// Authorize to perform operation
db.auth(`${process.env.MONGO_INITDB_ROOT_USERNAME}`, `${process.env.MONGO_INITDB_ROOT_PASSWORD}`);

// Create new database webchat
db = db.getSiblingDB('webchat');
// Create user for webchat database
db.createUser(
    {
        user: `${process.env.DB_ROOT_USERNAME}`,
        pwd: `${process.env.DB_ROOT_PASSWORD}`,
        roles: [
            {
                role: "readWrite",
                db: "webchat"
            }
        ]
    }
);

// Create collection users
db.createCollection("users");