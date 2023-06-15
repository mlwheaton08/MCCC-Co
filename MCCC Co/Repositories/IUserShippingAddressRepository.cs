using MCCC_Co_.Models;

namespace MCCC_Co_.Repositories
{
    public interface IUserShippingAddressRepository
    {
        UserShippingAddress GetById(int id);
        void Add(UserShippingAddress userShippingAddress);
        void Delete(int id);
        void Update(UserShippingAddress userShippingAddress);
    }
}