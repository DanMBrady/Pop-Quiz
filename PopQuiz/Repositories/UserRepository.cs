using Microsoft.Extensions.Configuration;
using PopQuiz.Utils;
using PopQuiz.Models;
namespace PopQuiz.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration config) : base(config) { }

        public User GetByFireBaseId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Select * from [User] Where FirebaseId = @firebaseId";
                    DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);
                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email")
                        };
                    }
                    conn.Close();
                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using( var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Insert into [User] (Name, Email, FirebaseId, DisplayName)
                                        Output Inserted.Id
                                        Values (@name, @email, @firebaseId, @displayName)";
                    DbUtils.AddParameter(cmd, "@name", user.Name);
                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@firebaseId", user.FirebaseId);
                    DbUtils.AddParameter(cmd, "@displayName", user.DisplayName);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
