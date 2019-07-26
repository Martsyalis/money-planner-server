const mongoose = require("mongoose");
mongoose.Promise = Promise;

const defaultDbUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/jdre";

module.exports = (dbUri = defaultDbUri) => {
  const promise = mongoose
    .connect(dbUri, {
      useMongoClient: true
    })
    .then(() => mongoose.connection);

  mongoose.connection.on("connected", () => {
    console.log("Mongoose default connection open to", dbUri);
  });

  mongoose.connection.on("error", err => {
    console.log("Mongoose default connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection disconnected");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });

  return promise;
};
