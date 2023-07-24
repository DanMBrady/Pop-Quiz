using System.Collections;
using Microsoft.Extensions.Configuration;
using PopQuiz.Models;
using PopQuiz.Utils;

namespace PopQuiz.Repositories
{
    public class SavedQuizRepository : BaseRepository, ISavedQuizRepository
    {
        public SavedQuizRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(SavedQuiz savedQuiz)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Insert Into SavedQuiz (UserId, QuizId)
                    Output Inserted.Id
                    Values (@userId, @quizId)";

                    DbUtils.AddParameter(cmd, "@userId", savedQuiz.UserId);
                    DbUtils.AddParameter(cmd, "quizId", savedQuiz.QuizId);
                    savedQuiz.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
