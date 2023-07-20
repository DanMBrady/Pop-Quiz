using PopQuiz.Models;

namespace PopQuiz.Repositories
{
    public interface IUserRepository
    {
        User GetByFireBaseId(string firebaseId);
    }
}