namespace flight_search.API;


public class Flights
{
    public string flight_id { get; set; } = string.Empty;

    public string departureDestination { get; set; } = string.Empty;

    public string arrivalDestination { get; set; } = string.Empty;

    public List<Itineraries> itineraries { get; set; } = new List<Itineraries> ();
}
