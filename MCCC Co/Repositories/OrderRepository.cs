﻿using MCCC_Co_.Models;
using MCCC_Co_.Utils;

namespace MCCC_Co_.Repositories;

public class OrderRepository : BaseRepository, IOrderRepository
{
    public OrderRepository(IConfiguration configuration) : base(configuration) { }

    public List<Order> GetAllByUserFirebaseId(string userFirebaseId, bool isComplete)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                var sql = @"SELECT
	                            o.Id,
	                            o.UserId,
	                            o.DateCreated,
	                            o.DateCompleted,
	                            o.RewardsUsed,
	                            o.TotalValue,
	                            o.TotalPaid,
	                            o.ConfirmationNumber,
	                            o.ShipCompanyName,
	                            o.ShipLineOne,
	                            o.ShipLineTwo,
	                            o.ShipCity,
	                            o.ShipState,
	                            o.ShipZIPCode,
	                            o.ShipCountry,
	                            oi.Id as OrderItemId,
	                            oi.ItemId as OrderItemItemId,
	                            oi.ItemQuantity as OrderItemQuantity,
	                            i.TypeId as ItemTypeId,
	                            i.SeriesId as ItemSeriesId,
	                            i.Height as ItemHeight,
	                            i.Width as ItemWidth,
	                            i.Depth as ItemDepth,
	                            i.[Description] as ItemDescription,
	                            i.[Image] as ItemImage,
	                            i.Price as ItemPrice,
	                            i.PurchaseCount as ItemPurchaseCount,
	                            t.[Name] as TypeName,
	                            t.[Image] as TypeImage,
	                            s.[Name] as SeriesName,
	                            s.Alloy as SeriesAlloy,
	                            s.BrightnessLevel as SeriesBrightnessLevel,
	                            s.[Description] as SeriesDescription,
	                            s.[Image] as SeriesImage,
	                            u.FirebaseId as UserFirebaseId,
	                            u.IsAdmin as UserIsAdmin,
	                            u.[Name] as UserName,
	                            u.Email as UserEmail,
	                            u.RewardsPoints as UserRewardsPoints
                            FROM [Order] o
                            LEFT JOIN OrderItem oi
	                            ON o.Id = oi.OrderId
                            LEFT JOIN Item i
	                            ON oi.ItemId = i.Id
                            LEFT JOIN [Type] t
	                            ON i.TypeId = t.Id
                            LEFT JOIN Series s
	                            ON i.SeriesId = s.Id
                            LEFT JOIN [User] u
	                            ON o.UserId = u.Id
							WHERE u.FirebaseId = @userFirebaseId AND o.DateCompleted";

                if (isComplete)
                {
                    sql += " IS NOT NULL";
                }
                else
                {
                    sql += " IS NULL";
                }

                sql += " ORDER BY DateCompleted DESC";

                cmd.CommandText = sql;
                DbUtils.AddParameter(cmd, "@userFirebaseId", userFirebaseId);
                var reader = cmd.ExecuteReader();

                var orders = new List<Order>();
                while (reader.Read())
                {
                    var orderId = DbUtils.GetInt(reader, "Id");
                    var existingOrder = orders.FirstOrDefault(o => o.Id == orderId);

                    if (existingOrder == null)
                    {
                        existingOrder = new Order()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            DateCompleted = DbUtils.GetNullableDateTime(reader, "DateCompleted"),
                            RewardsUsed = DbUtils.GetNullableInt(reader, "RewardsUsed"),
                            TotalValue = DbUtils.GetNullableDouble(reader, "TotalValue"),
                            TotalPaid = DbUtils.GetNullableDouble(reader, "TotalPaid"),
                            ConfirmationNumber = DbUtils.GetString(reader, "ConfirmationNumber"),
                            ShipCompanyName = DbUtils.GetString(reader, "ShipCompanyName"),
                            ShipLineOne = DbUtils.GetString(reader, "ShipLineOne"),
                            ShipLineTwo = DbUtils.GetString(reader, "ShipLineTwo"),
                            ShipCity = DbUtils.GetString(reader, "ShipCity"),
                            ShipState = DbUtils.GetString(reader, "ShipState"),
                            ShipZIPCode = DbUtils.GetString(reader, "ShipZIPCode"),
                            ShipCountry = DbUtils.GetString(reader, "ShipCountry"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirebaseId = DbUtils.GetString(reader, "UserFirebaseId"),
                                IsAdmin = DbUtils.GetBoolean(reader, "UserIsAdmin"),
                                Name = DbUtils.GetString(reader, "UserName"),
                                Email = DbUtils.GetString(reader, "UserEmail"),
                                RewardsPoints = DbUtils.GetNullableInt(reader, "UserRewardsPoints"),
                            },
                            OrderItems = new List<OrderItem>()
                        };

                        orders.Add(existingOrder);
                    }

                    if (DbUtils.IsNotDbNull(reader, "OrderItemId"))
                    {
                        existingOrder.OrderItems.Add(new OrderItem()
                        {
                            Id = DbUtils.GetInt(reader, "OrderItemId"),
                            OrderId = DbUtils.GetInt(reader, "Id"),
                            ItemId = DbUtils.GetInt(reader, "OrderItemItemId"),
                            ItemQuantity = DbUtils.GetInt(reader, "OrderItemQuantity"),
                            Item = new Item()
                            {
                                Id = DbUtils.GetInt(reader, "OrderItemItemId"),
                                TypeId = DbUtils.GetNullableInt(reader, "ItemTypeId"),
                                SeriesId = DbUtils.GetNullableInt(reader, "ItemSeriesId"),
                                Height = DbUtils.GetNullableInt(reader, "ItemHeight"),
                                Width = DbUtils.GetNullableInt(reader, "ItemWidth"),
                                Depth = DbUtils.GetNullableInt(reader, "ItemDepth"),
                                Description = DbUtils.GetString(reader, "ItemDescription"),
                                Image = DbUtils.GetString(reader, "ItemImage"),
                                Price = DbUtils.GetDouble(reader, "ItemPrice"),
                                PurchaseCount = DbUtils.GetNullableInt(reader, "ItemPurchaseCount"),
                                Type = new Models.Type()
                                {
                                    Id = DbUtils.GetInt(reader, "ItemTypeId"),
                                    Name = DbUtils.GetString(reader, "TypeName"),
                                    Image = DbUtils.GetString(reader, "TypeImage")
                                },
                                Series = new Series()
                                {
                                    Id = DbUtils.GetInt(reader, "ItemSeriesId"),
                                    Name = DbUtils.GetString(reader, "SeriesName"),
                                    Alloy = DbUtils.GetString(reader, "SeriesAlloy"),
                                    BrightnessLevel = DbUtils.GetNullableInt(reader, "SeriesBrightnessLevel"),
                                    Description = DbUtils.GetString(reader, "SeriesDescription"),
                                    Image = DbUtils.GetString(reader, "SeriesImage")
                                }
                            }
                        });
                    }
                }

                reader.Close();
                return orders;
            }
        }
    }

    public void Add(Order order)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Order]
	                                    (UserId,
	                                    DateCreated,
	                                    DateCompleted,
	                                    RewardsUsed,
	                                    TotalValue,
	                                    TotalPaid,
	                                    ConfirmationNumber,
                                        ShipCompanyName,
	                                    ShipLineOne,
	                                    ShipLineTwo,
	                                    ShipCity,
	                                    ShipState,
	                                    ShipZIPCode,
	                                    ShipCountry)
                                    OUTPUT INSERTED.ID
                                    VALUES
	                                    (@UserId,
	                                    @DateCreated,
	                                    @DateCompleted,
	                                    @RewardsUsed,
	                                    @TotalValue,
	                                    @TotalPaid,
	                                    @ConfirmationNumber,
                                        @ShipCompanyName,
	                                    @ShipLineOne,
	                                    @ShipLineTwo,
	                                    @ShipCity,
	                                    @ShipState,
	                                    @ShipZIPCode,
	                                    @ShipCountry)";

                DbUtils.AddParameter(cmd, "@UserId", order.UserId);
                DbUtils.AddParameter(cmd, "@DateCreated", order.DateCreated);
                DbUtils.AddParameter(cmd, "@DateCompleted", order.DateCompleted);
                DbUtils.AddParameter(cmd, "@RewardsUsed", order.RewardsUsed);
                DbUtils.AddParameter(cmd, "@TotalValue", order.TotalValue);
                DbUtils.AddParameter(cmd, "@TotalPaid", order.TotalPaid);
                DbUtils.AddParameter(cmd, "@ConfirmationNumber", order.ConfirmationNumber);
                DbUtils.AddParameter(cmd, "@ShipCompanyName", order.ShipCompanyName);
                DbUtils.AddParameter(cmd, "@ShipLineOne", order.ShipLineOne);
                DbUtils.AddParameter(cmd, "@ShipLineTwo", order.ShipLineTwo);
                DbUtils.AddParameter(cmd, "@ShipCity", order.ShipCity);
                DbUtils.AddParameter(cmd, "@ShipState", order.ShipState);
                DbUtils.AddParameter(cmd, "@ShipZIPCode", order.ShipZIPCode);
                DbUtils.AddParameter(cmd, "@ShipCountry", order.ShipCountry);

                order.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(Order order)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE [Order]
	                                    SET
		                                    UserId = @UserId,
		                                    DateCreated = @DateCreated,
		                                    DateCompleted = @DateCompleted,
		                                    RewardsUsed = @RewardsUsed,
		                                    TotalValue = @TotalValue,
		                                    TotalPaid = @TotalPaid,
		                                    ConfirmationNumber = @ConfirmationNumber,
                                            ShipCompanyName = @ShipCompanyName,
	                                        ShipLineOne = @ShipLineOne,
	                                        ShipLineTwo = @ShipLineTwo,
	                                        ShipCity = @ShipCity,
	                                        ShipState = @ShipState,
	                                        ShipZIPCode = @ShipZIPCode,
	                                        ShipCountry = @ShipCountry
                                    WHERE Id = @Id";

                DbUtils.AddParameter(cmd, "@Id", order.Id);
                DbUtils.AddParameter(cmd, "@UserId", order.UserId);
                DbUtils.AddParameter(cmd, "@DateCreated", order.DateCreated);
                DbUtils.AddParameter(cmd, "@DateCompleted", order.DateCompleted);
                DbUtils.AddParameter(cmd, "@RewardsUsed", order.RewardsUsed);
                DbUtils.AddParameter(cmd, "@TotalValue", order.TotalValue);
                DbUtils.AddParameter(cmd, "@TotalPaid", order.TotalPaid);
                DbUtils.AddParameter(cmd, "@ConfirmationNumber", order.ConfirmationNumber);
                DbUtils.AddParameter(cmd, "@ShipCompanyName", order.ShipCompanyName);
                DbUtils.AddParameter(cmd, "@ShipLineOne", order.ShipLineOne);
                DbUtils.AddParameter(cmd, "@ShipLineTwo", order.ShipLineTwo);
                DbUtils.AddParameter(cmd, "@ShipCity", order.ShipCity);
                DbUtils.AddParameter(cmd, "@ShipState", order.ShipState);
                DbUtils.AddParameter(cmd, "@ShipZIPCode", order.ShipZIPCode);
                DbUtils.AddParameter(cmd, "@ShipCountry", order.ShipCountry);

                cmd.ExecuteNonQuery();
            }
        }
    }
}