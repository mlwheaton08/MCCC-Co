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
}