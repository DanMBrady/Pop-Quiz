using PopQuiz.Models;
using System.Collections.Generic;

namespace PopQuiz.Repositories
{
    public interface IQuizRepository
    {
        List<Quiz> GetAll();

        public Quiz GetByIdWithQuestions(int id);

        public void Add(Quiz quiz);

        public void Update(Quiz quiz);

        public void Delete(int id);

        public List<Quiz> GetAllByUser(int id);
    }
}