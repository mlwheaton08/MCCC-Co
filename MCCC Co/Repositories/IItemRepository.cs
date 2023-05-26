using MCCC_Co_.Models;

namespace MCCC_Co_.Repositories
{
    public interface IItemRepository
    {
        List<Item> GetAll(string? sortBy, bool asc);
        Item GetById(int id);
    }
}