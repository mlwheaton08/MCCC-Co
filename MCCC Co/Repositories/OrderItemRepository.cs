using MCCC_Co_.Models;
using MCCC_Co_.Utils;

namespace MCCC_Co_.Repositories;

public class OrderItemRepository : BaseRepository, IOrderItemRepository
{
    public OrderItemRepository(IConfiguration configuration) : base(configuration) { }

    public void Add(OrderItem orderItem)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [OrderItem]
	                                    (OrderId,
	                                    ItemId,
	                                    ItemQuantity)
                                    OUTPUT INSERTED.ID
                                    VALUES
	                                    (@OrderId,
	                                    @ItemId,
	                                    @ItemQuantity)";

                DbUtils.AddParameter(cmd, "@OrderId", orderItem.OrderId);
                DbUtils.AddParameter(cmd, "@ItemId", orderItem.ItemId);
                DbUtils.AddParameter(cmd, "@ItemQuantity", orderItem.ItemQuantity);

                orderItem.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(OrderItem orderItem)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE [OrderItem]
                                        SET OrderId = @OrderId,
                                            ItemId = @ItemId,
                                            ItemQuantity = @ItemQuantity
                                    WHERE Id = @Id";

                DbUtils.AddParameter(cmd, "@Id", orderItem.Id);
                DbUtils.AddParameter(cmd, "@OrderId", orderItem.OrderId);
                DbUtils.AddParameter(cmd, "@ItemId", orderItem.ItemId);
                DbUtils.AddParameter(cmd, "@ItemQuantity", orderItem.ItemQuantity);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public void Delete(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "DELETE FROM [OrderItem] WHERE Id = @Id";
                DbUtils.AddParameter(cmd, "@Id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}