using MCCC_Co_.Models;

namespace MCCC_Co_.Repositories
{
    public interface IOrderItemRepository
    {
        OrderItem GetById(int id);
        int? GetOpenOrderItemTotalByUserFirebaseId(string firebaseId);
        void Add(OrderItem orderItem);
        void Delete(int id);
        void Update(OrderItem orderItem);
    }
}