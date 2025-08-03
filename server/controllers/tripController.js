import Trip from '../models/Trip.js';

export const createTrip = async (req, res) => {
  try {
    const newTrip = new Trip({
      ...req.body,
      userId: req.userId,
    });

    await newTrip.save();
    res
      .status(201)
      .json({ message: 'Trip created successfully', trip: newTrip });
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
