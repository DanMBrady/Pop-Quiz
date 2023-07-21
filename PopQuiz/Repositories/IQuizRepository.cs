using PopQuiz.Models;
using System.Collections.Generic;

namespace PopQuiz.Repositories
{
    public interface IQuizRepository
    {
        List<Quiz> GetAll();

        public Quiz GetByIdWithQuestions(int id);

        public void Add(Quiz quiz);
    }
}