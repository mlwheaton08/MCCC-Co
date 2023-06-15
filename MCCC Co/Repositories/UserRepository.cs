using MCCC_Co_.Models;
using MCCC_Co_.Utils;

namespace MCCC_Co_.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    public UserRepository(IConfiguration configuration) : base(configuration) { }

    public User GetByFirebaseId(string firebaseId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        Id,
	                                    FirebaseId,
	                                    IsAdmin,
	                                    [Name],
	                                    Email,
	                                    RewardsPoints
                                    FROM [User]
                                    WHERE FirebaseId = @firebaseId";
                DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);

                var reader = cmd.ExecuteReader();

                User user = null;
                if (reader.Read())
                {
                    user = new User()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                        IsAdmin = DbUtils.GetBoolean(reader, "IsAdmin"),
                        Name = DbUtils.GetString(reader, "Name"),
                        Email = DbUtils.GetString(reader, "Email"),
                        RewardsPoints = DbUtils.GetNullableInt(reader, "RewardsPoints")
                    };
                }

                reader.Close();
                return user;
            }
        }
    }

    public User GetByFirebaseIdWithAddresses(string firebaseId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
	                                    u.Id,
	                                    u.FirebaseId,
	                                    u.IsAdmin,
	                                    u.[Name],
	                                    u.Email,
	                                    u.RewardsPoints,
	                                    a.Id as AddressId,
	                                    a.NickName as AddressNickName,
	                                    a.CompanyName as AddressCompanyName,
	                                    a.LineOne as AddressLineOne,
	                                    a.LineTwo as AddressLineTwo,
	                                    a.City as AddressCity,
	                                    a.[State] as AddressState,
	                                    a.ZIPCode as AddressZIPCode,
	                                    a.Country as AddressCountry,
	                                    a.IsDefault as AddressIsDefault
                                    FROM [User] u
                                    LEFT JOIN UserShippingAddress a
	                                    ON u.Id = a.UserId
                                    WHERE u.FirebaseId = @firebaseId";
                DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);

                var reader = cmd.ExecuteReader();

                User user = null;
                while (reader.Read())
                {
                    if (user == null)
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            IsAdmin = DbUtils.GetBoolean(reader, "IsAdmin"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            RewardsPoints = DbUtils.GetNullableInt(reader, "RewardsPoints"),
                            Addresses = new List<UserShippingAddress>()
                        };
                    }

                    if (DbUtils.IsNotDbNull(reader, "AddressId"))
                    {
                        user.Addresses.Add(new UserShippingAddress()
                        {
                            Id = DbUtils.GetInt(reader, "AddressId"),
                            UserId = DbUtils.GetInt(reader, "Id"),
                            NickName = DbUtils.GetString(reader, "AddressNickName"),
                            CompanyName = DbUtils.GetString(reader, "AddressCompanyName"),
                            LineOne = DbUtils.GetString(reader, "AddressLineOne"),
                            LineTwo = DbUtils.GetString(reader, "AddressLineTwo"),
                            City = DbUtils.GetString(reader, "AddressCity"),
                            State = DbUtils.GetString(reader, "AddressState"),
                            ZIPCode = DbUtils.GetString(reader, "AddressZIPCode"),
                            Country = DbUtils.GetString(reader, "AddressCountry"),
                            IsDefault = DbUtils.GetNullableBoolean(reader, "AddressIsDefault")
                        });
                    }
                }

                reader.Close();
                return user;
            }
        }
    }

    public void Add(User user)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [User]
	                                    (FirebaseId,
	                                    IsAdmin,
	                                    [Name],
	                                    Email,
	                                    RewardsPoints)
                                    OUTPUT INSERTED.ID
                                    VALUES
	                                    (@FirebaseId,
	                                    @IsAdmin,
	                                    @Name,
	                                    @Email,
	                                    @RewardsPoints)";
                DbUtils.AddParameter(cmd, "@FirebaseId", user.FirebaseId);
                DbUtils.AddParameter(cmd, "@IsAdmin", user.IsAdmin);
                DbUtils.AddParameter(cmd, "@Name", user.Name);
                DbUtils.AddParameter(cmd, "@Email", user.Email);
                DbUtils.AddParameter(cmd, "@RewardsPoints", user.RewardsPoints);

                user.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(User user)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE [User]
	                                    SET FirebaseId = @FirebaseId,
		                                    IsAdmin = @IsAdmin,
		                                    [Name] = @Name,
		                                    Email = @Email,
		                                    RewardsPoints = @RewardsPoints
                                    WHERE Id = @Id";

                DbUtils.AddParameter(cmd, "@Id", user.Id);
                DbUtils.AddParameter(cmd, "@FirebaseId", user.FirebaseId);
                DbUtils.AddParameter(cmd, "@IsAdmin", user.IsAdmin);
                DbUtils.AddParameter(cmd, "@Name", user.Name);
                DbUtils.AddParameter(cmd, "@Email", user.Email);
                DbUtils.AddParameter(cmd, "@RewardsPoints", user.RewardsPoints);

                cmd.ExecuteNonQuery();
            }
        }
    }
}