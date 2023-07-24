using PopQuiz.Models;

namespace PopQuiz.Repositories
{
    public interface IScoreRepository
    {
        void Add(Score score);
    }
}