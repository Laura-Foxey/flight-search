using Newtonsoft.Json;

namespace flight_search.API.Repository
{
    public class DBAccess : IDBAccess
    {
        private List<Flights>? flights;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private string _fullPath;
        public DBAccess(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            var rootPath = _hostingEnvironment.ContentRootPath;
            _fullPath = Path.Combine(rootPath, "data.json");
            var jsonData = File.ReadAllText(_fullPath);

            if (string.IsNullOrWhiteSpace(jsonData)) flights = new List<Flights> ();
            else flights = JsonConvert.DeserializeObject<List<Flights>>(jsonData);
        }

        public Flights GetFlight(string departure, string destination, DateTime date)
        {
            var flight = flights?.FirstOrDefault(x => x.departureDestination == departure && x.arrivalDestination == destination && x.itineraries.Any(y => y.departureAt.Date == date.Date));
            if (flight == null) return null;
            var copy = flight.Clone();
            copy.itineraries = copy.itineraries.Where(y => y.departureAt.Date == date.Date).ToList();
            return copy;
        }

        public bool ReserveSeats(string departure, string destination, int id, int passangers)
        {
            var flight = flights?.FirstOrDefault(x => x.departureDestination == departure && x.arrivalDestination == destination);
            var itinerary = flight?.itineraries.FirstOrDefault(x => x.itinerary_id == id);
            if (itinerary?.avaliableSeats < passangers) return false;
            itinerary.avaliableSeats -= passangers;
            var jsonData = JsonConvert.SerializeObject(flights, Formatting.Indented);
            File.WriteAllText(_fullPath, jsonData);
            return true;
        }


    }
}
