using MCCC_Co_.Models;
using MCCC_Co_.Utils;

namespace MCCC_Co_.Repositories;

public class UserShippingAddressRepository : BaseRepository, IUserShippingAddressRepository
{
    public UserShippingAddressRepository(IConfiguration configuration) : base(configuration) { }

    public UserShippingAddress GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
	                                    Id,
	                                    UserId,
	                                    NickName,
	                                    CompanyName,
	                                    LineOne,
	                                    LineTwo,
	                                    City,
	                                    [State],
	                                    ZIPCode,
	                                    Country,
	                                    IsDefault
                                    FROM UserShippingAddress
                                    WHERE Id = @Id";
                DbUtils.AddParameter(cmd, "@Id", id);

                var reader = cmd.ExecuteReader();

                UserShippingAddress userShippingAddress = null;
                if (reader.Read())
                {
                    userShippingAddress = new UserShippingAddress()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        UserId = DbUtils.GetInt(reader, "UserId"),
                        NickName = DbUtils.GetString(reader, "NickName"),
                        CompanyName = DbUtils.GetString(reader, "CompanyName"),
                        LineOne = DbUtils.GetString(reader, "LineOne"),
                        LineTwo = DbUtils.GetString(reader, "LineTwo"),
                        City = DbUtils.GetString(reader, "City"),
                        State = DbUtils.GetString(reader, "State"),
                        ZIPCode = DbUtils.GetString(reader, "ZIPCode"),
                        Country = DbUtils.GetString(reader, "Country"),
                        IsDefault = DbUtils.GetNullableBoolean(reader, "IsDefault")
                    };
                }

                reader.Close();
                return userShippingAddress;
            }
        }
    }

    public void Add(UserShippingAddress userShippingAddress)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO UserShippingAddress
	                                    (UserId,
	                                    NickName,
	                                    CompanyName,
	                                    LineOne,
	                                    LineTwo,
	                                    City,
	                                    [State],
	                                    ZIPCode,
	                                    Country,
	                                    IsDefault)
                                    OUTPUT INSERTED.ID
                                    VALUES
	                                    (@UserId,
	                                    @NickName,
	                                    @CompanyName,
	                                    @LineOne,
	                                    @LineTwo,
	                                    @City,
	                                    @State,
	                                    @ZIPCode,
	                                    @Country,
	                                    @IsDefault)";

                DbUtils.AddParameter(cmd, "@UserId", userShippingAddress.UserId);
                DbUtils.AddParameter(cmd, "@NickName", userShippingAddress.NickName);
                DbUtils.AddParameter(cmd, "@CompanyName", userShippingAddress.CompanyName);
                DbUtils.AddParameter(cmd, "@LineOne", userShippingAddress.LineOne);
                DbUtils.AddParameter(cmd, "@LineTwo", userShippingAddress.LineTwo);
                DbUtils.AddParameter(cmd, "@City", userShippingAddress.City);
                DbUtils.AddParameter(cmd, "@State", userShippingAddress.State);
                DbUtils.AddParameter(cmd, "@ZIPCode", userShippingAddress.ZIPCode);
                DbUtils.AddParameter(cmd, "@Country", userShippingAddress.Country);
                DbUtils.AddParameter(cmd, "@IsDefault", userShippingAddress.IsDefault);

                userShippingAddress.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(UserShippingAddress userShippingAddress)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE UserShippingAddress
	                                    SET UserId = @UserId,
		                                    NickName = @NickName,
		                                    CompanyName = @CompanyName,
		                                    LineOne = @LineOne,
		                                    LineTwo = @LineTwo,
		                                    City = @City,
		                                    [State] = @State,
		                                    ZIPCode = @ZIPCode,
		                                    Country = @Country,
		                                    IsDefault = @IsDefault
                                    WHERE Id = @Id";

                DbUtils.AddParameter(cmd, "@Id", userShippingAddress.Id);
                DbUtils.AddParameter(cmd, "@UserId", userShippingAddress.UserId);
                DbUtils.AddParameter(cmd, "@NickName", userShippingAddress.NickName);
                DbUtils.AddParameter(cmd, "@CompanyName", userShippingAddress.CompanyName);
                DbUtils.AddParameter(cmd, "@LineOne", userShippingAddress.LineOne);
                DbUtils.AddParameter(cmd, "@LineTwo", userShippingAddress.LineTwo);
                DbUtils.AddParameter(cmd, "@City", userShippingAddress.City);
                DbUtils.AddParameter(cmd, "@State", userShippingAddress.State);
                DbUtils.AddParameter(cmd, "@ZIPCode", userShippingAddress.ZIPCode);
                DbUtils.AddParameter(cmd, "@Country", userShippingAddress.Country);
                DbUtils.AddParameter(cmd, "@IsDefault", userShippingAddress.IsDefault);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public void Delete(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "DELETE FROM UserShippingAddress WHERE Id = @Id";
                DbUtils.AddParameter(cmd, "@Id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}