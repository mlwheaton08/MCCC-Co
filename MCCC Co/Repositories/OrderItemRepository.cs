using MCCC_Co_.Models;
using MCCC_Co_.Utils;

namespace MCCC_Co_.Repositories;

public class OrderItemRepository : BaseRepository, IOrderItemRepository
{
    public OrderItemRepository(IConfiguration configuration) : base(configuration) { }

    public OrderItem GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
	                                    Id,
	                                    OrderId,
	                                    ItemId,
	                                    ItemQuantity
                                    FROM OrderItem
                                    WHERE Id = @id";
                DbUtils.AddParameter(cmd, "@id", id);

                var reader = cmd.ExecuteReader();

                OrderItem orderItem = null;
                if (reader.Read())
                {
                    orderItem = new OrderItem()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        OrderId = DbUtils.GetInt(reader, "OrderId"),
                        ItemId = DbUtils.GetInt(reader, "ItemId"),
                        ItemQuantity = DbUtils.GetInt(reader, "ItemQuantity")
                    };
                }

                reader.Close();
                return orderItem;
            }
        }
    }

    public int? GetOpenOrderItemTotalByUserFirebaseId(string firebaseId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
	                                    SUM(ItemQuantity) as OpenOrderItemTotal
                                    FROM [User] u
                                    JOIN [Order] o
	                                    ON u.Id = o.UserId
                                    JOIN OrderItem oi
	                                    ON o.Id = oi.OrderId
                                    WHERE FirebaseId = @firebaseId AND o.DateCompleted IS NULL";
                DbUtils.AddParameter(cmd, "@firebaseId", firebaseId);

                var reader = cmd.ExecuteReader();

                int? total = null;
                if (reader.Read())
                {
                    total = DbUtils.GetNullableInt(reader, "OpenOrderItemTotal");
                }

                reader.Close();
                return total;
            }
        }
    }

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