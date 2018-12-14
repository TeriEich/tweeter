"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      // db.tweets.push(newTweet);
      db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      let sortedTweets = db.collection('tweets').find().sort({ "created_at": -1 }).toArray(callback);
      // console.log(db.collection('tweets'));
      // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      // callback(null, db.tweets.sort(sortNewestFirst));
      // callback(null, sortedTweets);
    }


  };
  db.close();
}
