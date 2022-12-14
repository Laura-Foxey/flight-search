using flight_search.API.Repository;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseKestrel(c =>
{
    c.Limits.KeepAliveTimeout = TimeSpan.FromSeconds(3);
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IDBAccess, DBAccess>();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"));

app.UseAuthorization();

app.MapControllers();

app.Run();