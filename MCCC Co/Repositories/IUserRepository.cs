using MCCC_Co_.Models;

namespace MCCC_Co_.Repositories
{
    public interface IUserRepository
    {
        User GetByFirebaseId(string firebaseId);
        User GetByFirebaseIdWithAddresses(string firebaseId);
        void Add(User user);
        void Update(User user);
    }
}