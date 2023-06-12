using MCCC_Co_.Models;
using MCCC_Co_.Utils;

namespace MCCC_Co_.Repositories;

public class DistributorRepository : BaseRepository, IDistributorRepository
{
    public DistributorRepository(IConfiguration configuration) : base(configuration) { }

    public List<Distributor> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
	                                    Id,
	                                    [Name],
	                                    AddressLineOne,
	                                    AddressLineTwo,
	                                    City,
	                                    [State],
	                                    ZIPCode,
	                                    Country,
	                                    PhoneNumber
                                    FROM Distributor
                                    ORDER BY [Name]";

                var reader = cmd.ExecuteReader();
                var distributors = new List<Distributor>();

                while (reader.Read())
                {
                    var distributor = new Distributor()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        Name = DbUtils.GetString(reader, "Name"),
                        AddressLineOne = DbUtils.GetString(reader, "AddressLineOne"),
                        AddressLineTwo = DbUtils.GetString(reader, "AddressLineTwo"),
                        City = DbUtils.GetString(reader, "City"),
                        State = DbUtils.GetString(reader, "State"),
                        ZIPCode = DbUtils.GetString(reader, "ZIPCode"),
                        Country = DbUtils.GetString(reader, "Country"),
                        PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                    };

                    distributors.Add(distributor);
                }

                reader.Close();
                return distributors;
            }
        }
    }
}