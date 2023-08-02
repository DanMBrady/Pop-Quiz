using PopQuiz.Models;
using System.Collections.Generic;

namespace PopQuiz.Repositories
{
    public interface IScoreRepository
    {
        void Add(Score score);
        public List<Score> GetAllFromQuiz(int quizId);

        public Score GetById(int id);
    }
}