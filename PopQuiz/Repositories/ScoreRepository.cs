using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PopQuiz.Models;
using PopQuiz.Utils;
using System.Collections.Generic;
using System.Data.SqlTypes;

namespace PopQuiz.Repositories
{
    public class ScoreRepository : BaseRepository, IScoreRepository
    {
        public ScoreRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(Score score)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
insert                  into score (Score, QuizId, UserId)
output                  inserted.Id
Values                  (@score, @quizId, @userId)";

                    DbUtils.AddParameter(cmd, "@score", score.MyScore);
                    DbUtils.AddParameter(cmd, "@quizId", score.QuizId);
                    DbUtils.AddParameter(cmd, "@userId", score.UserId);
                    score.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Score> GetAllFromQuiz(int quizId) { 

            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select top 10 s.Id,s.Score,s.QuizId,s.UserId,u.Name,
            u.DisplayName from score s join [user] u on u.Id = s.UserId where s.QuizId = @id
            order by s.Score desc";

                    DbUtils.AddParameter(cmd, "@id", quizId);

                    using ( SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Score> scores = new List<Score>();

                        while (reader.Read())
                        {
                            Score score = new Score()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                QuizId = DbUtils.GetInt(reader, "QuizId"),
                                MyScore = DbUtils.GetInt(reader,"Score"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    DisplayName = DbUtils.GetString(reader,"DisplayName")
                                }
                            };
                            scores.Add(score);
                        }
                        return scores;
                    }
                }
            }
        
        }
    }
}
