namespace flight_search.API;
using System.Text.Json;
using System.Text.Json.Serialization;

public class Prices
{

    public string currency { get; set; } = string.Empty;

    public int adult { get; set; }

    public int child { get; set; }
    


    
}
