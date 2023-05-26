using MCCC_Co_.Models;

namespace MCCC_Co_.Repositories
{
    public interface IOrderRepository
    {
        List<Order> GetAllByUserFirebaseId(string userFirebaseId, bool isComplete);
    }
}