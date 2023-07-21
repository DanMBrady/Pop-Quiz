using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PopQuiz.Models;
using PopQuiz.Utils;
using System.Collections.Generic;

namespace PopQuiz.Repositories
{
    public class QuizRepository : BaseRepository, IQuizRepository
    {
        public QuizRepository(IConfiguration configuration) : base(configuration) { }

        public List<Quiz> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select q.Id,q.UserCreatedId,q.Name as Name,q.Image,q.Description,u.Name as UserName,
                    u.Email,u.DisplayName from quiz q join [User] u on u.Id = q.UserCreatedId";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var quizes = new List<Quiz>();

                        while (reader.Read())
                        {
                            var quiz = new Quiz()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserCreatedId = DbUtils.GetInt(reader, "UserCreatedId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader,"UserCreatedId"),
                                    Name = DbUtils.GetString(reader, "UserName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                                }
                            };
                            if (!reader.IsDBNull(reader.GetOrdinal("Image")))
                            {
                                quiz.Image = reader.GetString(reader.GetOrdinal("Image"));
                            }
                            quizes.Add(quiz);
                        }
                        return quizes;
                    }
                }
            }
        }
    }
}
