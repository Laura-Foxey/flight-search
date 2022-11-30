namespace flight_search.API;


public class Flights
{

    public string flight_id { get; set; }

    public string departureDestination { get; set; }

    public string arrivalDestination { get; set; }

    public List<Itineraries> itineraries { get; set; }
}
