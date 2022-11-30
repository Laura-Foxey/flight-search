using Newtonsoft.Json;

namespace flight_search.API.Repository
{
    public class DBAccess : IDBAccess
    {
        private List<Flights>? flights;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public DBAccess(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            var rootPath = _hostingEnvironment.ContentRootPath;
            var fullPath = Path.Combine(rootPath, "data.json");
            var jsonData = File.ReadAllText(fullPath);

            if (string.IsNullOrWhiteSpace(jsonData)) flights = new List<Flights> ();
            else flights = JsonConvert.DeserializeObject<List<Flights>>(jsonData);
        }

        public Flights GetFlight(string departure, string destination, DateTime date)
        {
            var flight = flights.FirstOrDefault(x => x.departureDestination == departure && x.arrivalDestination == destination && x.itineraries.Any(y => y.departureAt.Date == date.Date));
            if (flight == null) return null;
            flight.itineraries = flight.itineraries.Where(y => y.departureAt.Date == date.Date).ToList();
            return flight;
        }


    }
}
