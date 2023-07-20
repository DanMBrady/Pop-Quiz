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
    }
}
