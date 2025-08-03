import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: true,
    },
    selectedCountries: [
      {
        label: String,
        value: String,
      },
    ],
    selectedCities: [
      {
        label: String,
        name: String,
      },
    ],
    selectedDates: [
      {
        startDate: Date,
        endDate: Date,
      },
    ],
    selectedAirport: {
      landingAirport: {
        label: String,
        value: String,
      },
      departureAirport: {
        label: String,
        value: String,
      },
    },
    budget: String,
    adultNumber: Number,
    tripType: [String],
    accommodationType: String,
    kidsNumber: Number,
    transportationMode: String,
    avgDistance: String,
    avgTime: String,
    isStarTrip: String,
    mustAttractions: [String],
    numberAttractionsAvg: String,
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

export default mongoose.model('Trip', TripSchema);
