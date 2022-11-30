using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Hosting;
using System.Linq;
using Microsoft.Extensions.Primitives;
using Microsoft.AspNetCore.Hosting;

namespace flight_search.API.Controllers;


[ApiController]
public class FlightsController : ControllerBase
{
    private readonly IWebHostEnvironment  _hostingEnvironment;
    
     public FlightsController(IWebHostEnvironment hostingEnvironment)
    {
        _hostingEnvironment = hostingEnvironment;
    }

    // [HttpGet]
    // [Route("flights")]
    // public List<Flights> Get()
    // {
    //     var rootPath = _hostingEnvironment.ContentRootPath;
    //     var fullPath = Path.Combine(rootPath, "data.json");
    //     var jsonData = System.IO.File.ReadAllText(fullPath);

    //     if (string.IsNullOrWhiteSpace(jsonData)) return null;
    //     var flights = JsonConvert.DeserializeObject<List<Flights>>(jsonData);
    //     if (flights == null || flights.Count == 0) return null;
    //     return flights;
    // }

    [HttpGet]
    [Route("flights/{id}")]
    public Flights GetOne(string id)
    {
        var rootPath = _hostingEnvironment.ContentRootPath;
        var fullPath = Path.Combine(rootPath, "data.json");
        var jsonData = System.IO.File.ReadAllText(fullPath);

        if (string.IsNullOrWhiteSpace(jsonData)) return null;
        var flights = JsonConvert.DeserializeObject<List<Flights>>(jsonData);
        if (flights == null || flights.Count == 0) return null;
        var flight = flights.FirstOrDefault(x => x.flight_id == id);
        if (flight != null) return flight;
        return null;
    }

    [HttpGet]
    [Route("flights")]
    public Flights GetByParams(string departure, string destination)
    {
        var rootPath = _hostingEnvironment.ContentRootPath;
        var fullPath = Path.Combine(rootPath, "data.json");
        var jsonData = System.IO.File.ReadAllText(fullPath);

        if (string.IsNullOrWhiteSpace(jsonData)) return null;
        var flights = JsonConvert.DeserializeObject<List<Flights>>(jsonData);
        if (flights == null || flights.Count == 0) return null;
        var flight = flights.FirstOrDefault(x => x.departureDestination == departure && x.arrivalDestination == destination);
        if (flight != null) return flight;
        return null;
    }

    [HttpPatch]
    [Route("flights/{id}")]
    public Flights UpdateSeats(string id, int passangers)
    {
        var rootPath = _hostingEnvironment.ContentRootPath;
        var fullPath = Path.Combine(rootPath, "data.json");
        var jsonData = System.IO.File.ReadAllText(fullPath);

        if (string.IsNullOrWhiteSpace(jsonData)) return null;
        var flights = JsonConvert.DeserializeObject<List<Flights>>(jsonData);
        if (flights == null || flights.Count == 0) return null;
        var flight = flights.FirstOrDefault(x => x.flight_id == id);
        if (flight == null) return null;
        flight.itineraries[0].avaliableSeats = passangers;
        return null;
    }
}
