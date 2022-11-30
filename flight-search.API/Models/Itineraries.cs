namespace flight_search.API;
using System.Text.Json;
using System.Text.Json.Serialization;

public class Itineraries
{

    public DateTime departureAt { get; set; }

    public DateTime arriveAt { get; set; }

    public int avaliableSeats { get; set; }
    
    public List<Prices> prices { get; set; }

    
}
