using PopQuiz.Models;

namespace PopQuiz.Repositories
{
    public interface ISavedQuizRepository
    {
        void Add(SavedQuiz savedQuiz);
    }
}