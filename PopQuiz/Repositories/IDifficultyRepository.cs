using PopQuiz.Models;
using System.Collections.Generic;

namespace PopQuiz.Repositories
{
    public interface IDifficultyRepository
    {
        List<Difficulty> GetAll();
    }
}