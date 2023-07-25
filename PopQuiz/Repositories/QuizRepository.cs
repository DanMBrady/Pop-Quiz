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

        public List<Quiz> GetAllByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select q.Id,q.UserCreatedId,q.Name as Name,q.Image,q.Description,u.Name as UserName,
                    u.Email,u.DisplayName from quiz q join [User] u on u.Id = q.UserCreatedId Where q.UserCreatedId = @id";

                    DbUtils.AddParameter(cmd, "@id", id);    

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
                                    Id = DbUtils.GetInt(reader, "UserCreatedId"),
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

        public void Add(Quiz quiz)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Insert into Quiz (UserCreatedId,Name,Image,Description)
                    Output Inserted.Id
                    Values (@userCreatedId, @name, @image, @description)";

                    DbUtils.AddParameter(cmd,"@userCreatedId", quiz.UserCreatedId);
                    DbUtils.AddParameter(cmd, "@name", quiz.Name);
                    DbUtils.AddParameter(cmd, "@image", DbUtils.ValueOrDBNull(quiz.Image));
                    DbUtils.AddParameter(cmd, "@description", quiz.Description);
                    quiz.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        

        public void Update(Quiz quiz) { 
        using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Update Quiz Set UserCreatedId = @userCreatedId,
                    Name = @name, Image = @image, Description = @description
                    Where Id = @id";

                    DbUtils.AddParameter(cmd, "@userCreatedId", quiz.UserCreatedId);
                    DbUtils.AddParameter(cmd, "@name", quiz.Name);
                    DbUtils.AddParameter(cmd, "@image", DbUtils.ValueOrDBNull(quiz.Image));
                    DbUtils.AddParameter(cmd, "@description", quiz.Description);
                    DbUtils.AddParameter(cmd, "@id", quiz.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"Delete From Quiz Where Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public Quiz GetByIdWithQuestions(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select q.Id,q.UserCreatedId,q.Name as Name,q.Image,q.Description,u.Name as UserName,u.Email
                    ,u.DisplayName,qu.Question,qu.AnswerOne,qu.AnswerTwo,qu.AnswerThree,qu.AnswerFour,qu.CorrectAnswer,qu.Id as QuestionId from quiz q join [User] u on u.Id = q.UserCreatedId 
                    left join Question qu on q.id = qu.QuizId Where q.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Quiz quiz = null;
                        while (reader.Read())
                        {
                            if(quiz == null)
                            {
                                quiz = new Quiz()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    UserCreatedId = DbUtils.GetInt(reader, "UserCreatedId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    User = new User()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserCreatedId"),
                                        Name = DbUtils.GetString(reader, "UserName"),
                                        Email = DbUtils.GetString(reader, "Email"),
                                        DisplayName = DbUtils.GetString(reader, "DisplayName")
                                    },
                                    Questions = new List<Question>()
                                };
                                if (!reader.IsDBNull(reader.GetOrdinal("Image")))
                                {
                                    quiz.Image = reader.GetString(reader.GetOrdinal("Image"));
                                }
                            }
                            if (DbUtils.IsNotDbNull(reader, "QuestionId"))
                            {
                                quiz.Questions.Add(new Question()
                                {
                                    Id = DbUtils.GetInt(reader,"QuestionId"),
                                    QuizId = DbUtils.GetInt(reader,"Id"),
                                    MyQuestion = DbUtils.GetString(reader,"Question"),
                                    AnswerOne = DbUtils.GetString(reader,"AnswerOne"),
                                    AnswerTwo = DbUtils.GetString(reader,"AnswerTwo"),
                                    AnswerThree = DbUtils.GetString(reader, "AnswerThree"),
                                    AnswerFour = DbUtils.GetString(reader, "AnswerFour"),
                                    CorrectAnswer = DbUtils.GetString(reader, "CorrectAnswer"),
                                });
                            }
                        }
                        return quiz;
                    }
                }
            }
        }
    }
}
