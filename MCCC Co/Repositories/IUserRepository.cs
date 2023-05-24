using MCCC_Co_.Models;

namespace MCCC_Co_.Repositories
{
    public interface IUserRepository
    {
        User GetByFirebaseId(string firebaseId);
        void Add(User user);
    }
}