export default function useTripCities(selectedTrip) {
  const cities = (selectedTrip?.selectedCities || [])
    .map((c) => c?.label?.trim())
    .filter(Boolean);

  const landing = selectedTrip?.selectedAirport?.landingAirport?.label?.trim();
  const departure =
    selectedTrip?.selectedAirport?.departureAirport?.label?.trim();
  const limit = Number(selectedTrip?.numberAttractionsAvg) || 4;

  return { tripCities: cities, landing, departure, limit };
}
