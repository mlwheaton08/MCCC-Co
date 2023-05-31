using MCCC_Co_.Models;

namespace MCCC_Co_.Repositories
{
    public interface IOrderItemRepository
    {
        void Add(OrderItem orderItem);
        void Delete(int id);
        void Update(OrderItem orderItem);
    }
}