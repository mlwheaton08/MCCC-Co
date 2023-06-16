using MCCC_Co_.Models;
using MCCC_Co_.Utils;

namespace MCCC_Co_.Repositories;

public class ItemRepository : BaseRepository, IItemRepository
{
    public ItemRepository(IConfiguration configuration) : base(configuration) { }

    public List<Item> GetAll(string? sortBy, bool asc)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                var sql = @"SELECT
								i.Id,
								i.TypeId,
								i.SeriesId,
								i.Height,
								i.Width,
								i.Depth,
								i.[Description],
								i.[Image],
								i.Price,
								i.PurchaseCount,
								t.[Name] as TypeName,
								t.[Image] as TypeImage,
								s.[Name] as SeriesName,
								s.Alloy as SeriesAlloy,
								s.BrightnessLevel as SeriesBrightnessLevel,
								s.[Description] as SeriesDescription,
								s.[Image] as SeriesImage
							FROM Item i
							JOIN [Type] t
								ON i.TypeId = t.Id
							JOIN Series s
								ON i.SeriesId = s.Id";

                if (sortBy == null)
                {
                    sql += " ORDER BY PurchaseCount";
                }
                else
                {
                    sql += $" ORDER BY {sortBy}";
                }

                if (asc)
                {
                    sql += " ASC";
                }
                else
                {
                    sql += " DESC";
                }

                cmd.CommandText = sql;
                var reader = cmd.ExecuteReader();

                var items = new List<Item>();
                while (reader.Read())
                {
                    var item = new Item()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        TypeId = DbUtils.GetNullableInt(reader, "TypeId"),
                        SeriesId = DbUtils.GetNullableInt(reader, "SeriesId"),
                        Height = DbUtils.GetNullableInt(reader, "Height"),
                        Width = DbUtils.GetNullableInt(reader, "Width"),
                        Depth = DbUtils.GetNullableInt(reader, "Depth"),
                        Description = DbUtils.GetString(reader, "Description"),
                        Image = DbUtils.GetString(reader, "Image"),
                        Price = DbUtils.GetDouble(reader, "Price"),
                        PurchaseCount = DbUtils.GetNullableInt(reader, "PurchaseCount")
                    };

                    if (DbUtils.IsNotDbNull(reader, "TypeId"))
                    {
                        item.Type = new Models.Type()
                        {
                            Id = DbUtils.GetInt(reader, "TypeId"),
                            Name = DbUtils.GetString(reader, "TypeName"),
                            Image = DbUtils.GetString(reader, "TypeImage")
                        };
                    }

                    if (DbUtils.IsNotDbNull(reader, "SeriesId"))
                    {
                        item.Series = new Series()
                        {
                            Id = DbUtils.GetInt(reader, "SeriesId"),
                            Name = DbUtils.GetString(reader, "SeriesName"),
                            Alloy = DbUtils.GetString(reader, "SeriesAlloy"),
                            BrightnessLevel = DbUtils.GetNullableInt(reader, "SeriesBrightnessLevel"),
                            Description = DbUtils.GetString(reader, "SeriesDescription"),
                            Image = DbUtils.GetString(reader, "SeriesImage")
                        };
                    }

                    items.Add(item);
                }

                reader.Close();
                return items;
            }
        }
    }

    public Item GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
	                                    i.Id,
	                                    i.TypeId,
	                                    i.SeriesId,
	                                    i.Height,
	                                    i.Width,
	                                    i.Depth,
	                                    i.[Description],
	                                    i.[Image],
	                                    i.Price,
	                                    i.PurchaseCount,
	                                    t.[Name] as TypeName,
	                                    t.[Image] as TypeImage,
	                                    s.[Name] as SeriesName,
	                                    s.Alloy as SeriesAlloy,
	                                    s.BrightnessLevel as SeriesBrightnessLevel,
	                                    s.[Description] as SeriesDescription,
	                                    s.[Image] as SeriesImage,
	                                    a.[Case] as [Application]
                                    FROM Item i
                                    JOIN [Type] t
	                                    ON i.TypeId = t.Id
                                    JOIN Series s
	                                    ON i.SeriesId = s.Id
                                    JOIN SeriesApplication sa
	                                    ON s.Id = sa.SeriesId
                                    JOIN [Application] a
	                                    ON sa.ApplicationId = a.Id
                                    WHERE i.Id = @Id
                                    ORDER BY [Application]";
                DbUtils.AddParameter(cmd, "@Id", id);

                var reader = cmd.ExecuteReader();

                Item item = null;
                while (reader.Read())
                {
                    if (item == null)
                    {
                        item = new Item()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            TypeId = DbUtils.GetNullableInt(reader, "TypeId"),
                            SeriesId = DbUtils.GetNullableInt(reader, "SeriesId"),
                            Height = DbUtils.GetNullableInt(reader, "Height"),
                            Width = DbUtils.GetNullableInt(reader, "Width"),
                            Depth = DbUtils.GetNullableInt(reader, "Depth"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Image = DbUtils.GetString(reader, "Image"),
                            Price = DbUtils.GetDouble(reader, "Price"),
                            PurchaseCount = DbUtils.GetNullableInt(reader, "PurchaseCount"),
                            Type = new Models.Type()
                            {
                                Id = DbUtils.GetInt(reader, "TypeId"),
                                Name = DbUtils.GetString(reader, "TypeName"),
                                Image = DbUtils.GetString(reader, "TypeImage")
                            },
                            Series = new Series()
                            {
                                Id = DbUtils.GetInt(reader, "SeriesId"),
                                Name = DbUtils.GetString(reader, "SeriesName"),
                                Alloy = DbUtils.GetString(reader, "SeriesAlloy"),
                                BrightnessLevel = DbUtils.GetNullableInt(reader, "SeriesBrightnessLevel"),
                                Description = DbUtils.GetString(reader, "SeriesDescription"),
                                Image = DbUtils.GetString(reader, "SeriesImage")
                            },
                            Applications = new List<string>()
                        };
                    }

                    if (DbUtils.IsNotDbNull(reader, "Application"))
                    {
                        item.Applications.Add(DbUtils.GetString(reader, "Application"));
                    }
                }

                reader.Close();
                return item;
            }
        }
    }

    public List<Item> Search(string criterion, int? rowAmount)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                var sql = "SELECT";
                if (rowAmount.HasValue)
                {
                    sql += $" TOP {rowAmount}";
                }
                sql += @" i.Id,
	                    i.TypeId,
	                    i.SeriesId,
	                    i.Height,
	                    i.Width,
	                    i.Depth,
	                    i.[Description],
	                    i.[Image],
	                    i.Price,
	                    i.PurchaseCount,
	                    t.[Name] as TypeName,
	                    t.[Image] as TypeImage,
	                    s.[Name] as SeriesName,
	                    s.Alloy as SeriesAlloy,
	                    s.BrightnessLevel as SeriesBrightnessLevel,
	                    s.[Description] as SeriesDescription,
	                    s.[Image] as SeriesImage
                    FROM Item i
                    JOIN [Type] t
	                    ON i.TypeId = t.Id
                    JOIN Series s
	                    ON i.SeriesId = s.Id
                    WHERE Width LIKE @criterion
	                    OR t.[Name] LIKE @criterion
	                    OR s.[Name] LIKE @criterion
	                    OR s.Alloy LIKE @criterion
                    ORDER BY PurchaseCount DESC, SeriesName";

                cmd.CommandText = sql;
                DbUtils.AddParameter(cmd, "@criterion", $"%{criterion}%");
                var reader = cmd.ExecuteReader();

                var items = new List<Item>();
                while (reader.Read())
                {
                    var item = new Item()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        TypeId = DbUtils.GetNullableInt(reader, "TypeId"),
                        SeriesId = DbUtils.GetNullableInt(reader, "SeriesId"),
                        Height = DbUtils.GetNullableInt(reader, "Height"),
                        Width = DbUtils.GetNullableInt(reader, "Width"),
                        Depth = DbUtils.GetNullableInt(reader, "Depth"),
                        Description = DbUtils.GetString(reader, "Description"),
                        Image = DbUtils.GetString(reader, "Image"),
                        Price = DbUtils.GetDouble(reader, "Price"),
                        PurchaseCount = DbUtils.GetNullableInt(reader, "PurchaseCount")
                    };

                    if (DbUtils.IsNotDbNull(reader, "TypeId"))
                    {
                        item.Type = new Models.Type()
                        {
                            Id = DbUtils.GetInt(reader, "TypeId"),
                            Name = DbUtils.GetString(reader, "TypeName"),
                            Image = DbUtils.GetString(reader, "TypeImage")
                        };
                    }

                    if (DbUtils.IsNotDbNull(reader, "SeriesId"))
                    {
                        item.Series = new Series()
                        {
                            Id = DbUtils.GetInt(reader, "SeriesId"),
                            Name = DbUtils.GetString(reader, "SeriesName"),
                            Alloy = DbUtils.GetString(reader, "SeriesAlloy"),
                            BrightnessLevel = DbUtils.GetNullableInt(reader, "SeriesBrightnessLevel"),
                            Description = DbUtils.GetString(reader, "SeriesDescription"),
                            Image = DbUtils.GetString(reader, "SeriesImage")
                        };
                    }

                    items.Add(item);
                }

                reader.Close();
                return items;
            }
        }
    }
}