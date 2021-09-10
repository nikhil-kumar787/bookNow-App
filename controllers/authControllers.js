import User from "../models/user";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

// Register user => /api/auth/register
const registerUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "PUBLIC_ID",
      url: "URL",
    },
  });
  res.status(200).json({
    success: true,
    message: "Account Registered Successfully",
  });
});

// Get  Single room details => /api/rooms
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    room,
  });
});

//create new room => /api/rooms
const newRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.create(req.body);

  res.status(200).json({
    succes: true,
    room,
  });
});

// Get  Single room details => /api/rooms
const updateRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this id", 404));
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    room,
  });
});

const deleteRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("Room not found with this id", 404));
  }

  await room.remove();

  res.status(200).json({
    success: true,
    message: "Room is deleted",
  });
});

export { registerUser, getSingleRoom, updateRoom, deleteRoom };
