const  Room = require('../models/room');
const mongoose = require('mongoose')
const dbConnect = require('../config/dbConnect');
const rooms = require('../data/rooms');

mongoose.connect('mongodb+srv://nikhilkumar:bhQWUrUfnDq0aaKw@cluster0.g2p2u.mongodb.net/BookNow?retryWrites=true&w=majority',
    err => {
        if(err) throw err;
        console.log('connected to MongoDB') 
    });

const seedRooms = async () => {
    try {
      
      await Room.deleteMany();
      console.log('Rooms are deleted');

      await Room.insertMany(rooms);
      console.log('All Rooms are added');

      process.exit()

    } catch (error) {
        console.log(error.message);
        process.exit()
    }
}

seedRooms()

