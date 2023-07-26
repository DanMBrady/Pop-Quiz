using System.Collections;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PopQuiz.Models;
using PopQuiz.Utils;

namespace PopQuiz.Repositories
{
    public class SavedQuizRepository : BaseRepository, ISavedQuizRepository
    {
        public SavedQuizRepository(IConfiguration configuration) : base(configuration) { }

        public List<SavedQuiz> GetAllByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select s.Id,s.UserId,s.QuizId, quiz.UserCreatedId,quiz.Name,quiz.Image,
                    Quiz.Description from SavedQuiz s join quiz on quizId = quiz.Id
                    Where UserId = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<SavedQuiz> quizes = new List<SavedQuiz>();
                        while (reader.Read())
                        {
                            SavedQuiz quiz = new SavedQuiz()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                QuizId = DbUtils.GetInt(reader,"QuizId"),
                                Quiz = new Quiz()
                                {
                                    Id = DbUtils.GetInt(reader, "QuizId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Description = DbUtils.GetString(reader,"Description")
                                    
                                }
                            };
                            if (!reader.IsDBNull(reader.GetOrdinal("Image")))
                            {
                                quiz.Quiz.Image = reader.GetString(reader.GetOrdinal("Image"));
                            }
                            quizes.Add(quiz);
                        }
                        return quizes;
                    }
                }
            }
        }

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


       public void Delete(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Delete From SavedQuiz Where Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<SavedQuiz> GetAllByQuiz(int quizId,int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Select * from SavedQuiz where userId =@userId And quizId = @quizId";
                    DbUtils.AddParameter(cmd, "@userId", userId);
                    DbUtils.AddParameter(cmd, "@quizId", quizId);
                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<SavedQuiz> saved = new List<SavedQuiz>();

                        while (reader.Read())
                        {
                            SavedQuiz save = new SavedQuiz()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                            };
                        saved.Add(save);
                        }
                        return saved;
                    }
                }
            }
        }
    }
}
