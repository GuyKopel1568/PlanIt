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

export const getTripsByUserId = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.userId });
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { ...req.body, userId: req.userId },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json({ message: 'Trip updated successfully', trip });
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching all trips:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTripsByDestination = async (req, res) => {
  try {
    const { destination } = req.query;
    const trips = await Trip.find({
      destination: new RegExp(destination, 'i'),
    });
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips by destination:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTripsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const trips = await Trip.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips by date range:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
