using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PopQuiz.Models;
using PopQuiz.Utils;
using System.Collections.Generic;

namespace PopQuiz.Repositories
{
    public class QuestionRepository : BaseRepository, IQuestionRepository
    {
        public QuestionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Question> GetAllByQuiz(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "Select * from Question Where QuizId = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Question> questions = new List<Question>();

                        while (reader.Read())
                        {
                            Question question = new Question()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                QuizId = DbUtils.GetInt(reader, "QuizId"),
                                MyQuestion = DbUtils.GetString(reader, "Question"),
                                AnswerOne = DbUtils.GetString(reader, "AnswerOne"),
                                AnswerTwo = DbUtils.GetString(reader, "AnswerTwo"),
                                AnswerThree = DbUtils.GetString(reader, "AnswerThree"),
                                AnswerFour = DbUtils.GetString(reader, "AnswerFour"),
                                CorrectAnswer = DbUtils.GetString(reader, "CorrectAnswer"),


                            };
                            questions.Add(question);
                        }
                        return questions;
                    }
                }
            }
        }

        public void Add(Question question)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Insert Into Question (QuizId, Question, AnswerOne,
                    AnswerTwo, AnswerThree, AnswerFour, CorrectAnswer)
                    Output Inserted.Id
                    Values(@quizId, @question, @answerOne, @answerTwo, @answerThree, @answerFour, @correctAnswer)";
                    DbUtils.AddParameter(cmd, "@quizId", question.QuizId);
                    DbUtils.AddParameter(cmd, "@question", question.MyQuestion);
                    DbUtils.AddParameter(cmd, "@answerOne", question.AnswerOne);
                    DbUtils.AddParameter(cmd, "@answerTwo", question.AnswerTwo);
                    DbUtils.AddParameter(cmd, "@answerThree", question.AnswerThree);
                    DbUtils.AddParameter(cmd, "@answerFour", question.AnswerFour);
                    DbUtils.AddParameter(cmd, "@correctAnswer", question.CorrectAnswer);

                    question.Id =(int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Question question)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using( var cmd = conn.CreateCommand() )
                {
                    cmd.CommandText = @"Update Question Set QuizId = @quizId, Question = @question,
                    AnswerOne = @answerOne, AnswerTwo = @answerTwo, AnswerThree = @answerThree, 
                    AnswerFour = @answerFour, CorrectAnswer = @correctAnswer Where Id = @id";

                    DbUtils.AddParameter(cmd, "@quizId", question.QuizId);
                    DbUtils.AddParameter(cmd, "@question", question.MyQuestion);
                    DbUtils.AddParameter(cmd, "@answerOne", question.AnswerOne);
                    DbUtils.AddParameter(cmd, "@answerTwo", question.AnswerTwo);
                    DbUtils.AddParameter(cmd, "@answerThree", question.AnswerThree);
                    DbUtils.AddParameter(cmd, "@answerFour", question.AnswerFour);
                    DbUtils.AddParameter(cmd, "@correctAnswer", question.CorrectAnswer);
                    DbUtils.AddParameter(cmd, "@id", question.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
