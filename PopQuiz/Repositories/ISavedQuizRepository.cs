using PopQuiz.Models;
using System.Collections.Generic;

namespace PopQuiz.Repositories
{
    public interface ISavedQuizRepository
    {
        public List<SavedQuiz> GetAllByUser(int id);
        void Add(SavedQuiz savedQuiz);

        public void Delete(int id);
    }
}