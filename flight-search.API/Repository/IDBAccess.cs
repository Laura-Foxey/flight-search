namespace flight_search.API.Repository
{
    public interface IDBAccess
    {
        Flights? GetFlight(string departure, string destination, DateTime date);
        Flights? GetByID(int id);

        bool ReserveSeats(string departure, string destination, int id, int passangers);
    }
}
