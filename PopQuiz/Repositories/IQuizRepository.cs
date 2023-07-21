using PopQuiz.Models;
using System.Collections.Generic;

namespace PopQuiz.Repositories
{
    public interface IQuizRepository
    {
        List<Quiz> GetAll();
    }
}