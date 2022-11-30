using Microsoft.AspNetCore.Mvc;

using System.Text.Json;
using Newtonsoft.Json;
using flight_search.API.Repository;

namespace flight_search.API.Controllers;


[ApiController]
public class FlightsController : ControllerBase
{
    private readonly IDBAccess _access;

    public FlightsController(IDBAccess db)
    {
        _access = db;
    }

    [HttpGet]
    [Route("flights")]
    public ActionResult GetByParams(string departure, string destination, DateTime date)
    {
        var flight = FindFlight(departure, destination, date);
        if (flight == null) return NotFound();
        return Ok(flight);
    }


    [HttpPatch]
    [Route("flights/{id}")]
    public Flights UpdateSeats(string departure, string destination, int id, int passangers)
    {
        var flight = FindFlight(departure, destination, date);

    }
}
