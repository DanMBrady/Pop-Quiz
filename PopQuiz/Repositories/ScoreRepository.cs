using Microsoft.Extensions.Configuration;
using PopQuiz.Models;
using PopQuiz.Utils;

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
                    cmd.CommandText = @"Insert Into Score (Score, QuizId, UserId)
                    Output Insterted.Id
                    Values (@score, @quizId, @userId)";

                    DbUtils.AddParameter(cmd, "@score", score.MyScore);
                    DbUtils.AddParameter(cmd, "@quizId", score.QuizId);
                    DbUtils.AddParameter(cmd, "@userId", score.UserId);
                    score.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
