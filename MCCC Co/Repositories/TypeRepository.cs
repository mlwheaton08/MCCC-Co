using MCCC_Co_.Utils;

namespace MCCC_Co_.Repositories;

public class TypeRepository : BaseRepository, ITypeRepository
{
    public TypeRepository(IConfiguration configuration) : base(configuration) { }

    public List<Models.Type> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
	                                    Id,
	                                    [Name],
	                                    [Image]
                                    FROM [Type]";

                var reader = cmd.ExecuteReader();
                var types = new List<Models.Type>();

                while (reader.Read())
                {
                    var type = new Models.Type()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        Name = DbUtils.GetString(reader, "Name"),
                        Image = DbUtils.GetString(reader, "Image")
                    };

                    types.Add(type);
                }

                reader.Close();
                return types;
            }
        }
    }
}