using MCCC_Co_.Models;

namespace MCCC_Co_.Repositories
{
    public interface IPackRepository
    {
        List<Pack> GetAll();
        Pack GetByIdWithPackItems(int id);
    }
}