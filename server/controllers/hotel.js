import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res) => {
  try {
    const { hotelName, location } = req.body;
    const preHotel = await Hotel.findOne({
      $and: [
        {
          hotelName,
        },
        {
          location,
        },
      ],
    });
    if (preHotel) {
      res.status(400).json({ message: "Hotel Already exist" });
    }
    else{

      const hotel = new Hotel(req.body);
      const savedHotel = await hotel.save();
      res.status(201).json({savedHotel, message: "Hotel Added " });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateHotel = async (req, res) => {
  try {
    const { _id,hotelName,location } =req.body;
    
    const preHotel = await Hotel.findOne({
      $and: [
        {
          _id: { $ne: _id },
        },
        {
          hotelName,
        },
        {
          location,
        },
      ],
    });
    if (preHotel) {
      res.status(400).json({ message: "Hotel already exist" });
    }
    else{

     
      const updated = await Hotel.findOneAndUpdate({ _id: _id }, req.body, {
        new: true,
      });
      await updated.save();
      res.status(200).json({updated,message:"Hotel Details Updated"});
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteHotel = async (req, res) => {
  const { _id } = req.body;
  try {
    const updated = await Hotel.findOneAndUpdate(
      { _id: _id },
      { status: "inactive" },
      {
        new: true,
      }
    );
    await updated.save();

    res.status(200).json({updated,message:"Hotel Deleted"});
  } catch (error) {
    res.status(400).json({ message: "Cannot be Deleted" });
  }
};

export const getHotel = async (req, res) => {
  try {
    const hotels = await Hotel.find({
      status: "active",
    });
    res.status(200).json(hotels);
  } catch (err) {
    console.log("error is", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getHotelByCity = async (req, res) => {
  try {
    const { location } = req.params;
    const re = new RegExp(location, "i");
    const hotels = await Hotel.find({
      $and: [
        {
          location: re,
        },
        {
          status: "active",
        },
      ],
    });
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
