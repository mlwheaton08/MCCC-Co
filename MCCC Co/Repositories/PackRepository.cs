using MCCC_Co_.Controllers;
using MCCC_Co_.Models;
using MCCC_Co_.Utils;

namespace MCCC_Co_.Repositories;

public class PackRepository : BaseRepository, IPackRepository
{
    public PackRepository(IConfiguration configuration) : base(configuration) { }

    public List<Pack> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
	                                    Id,
	                                    [Name],
	                                    [Description],
	                                    [Image]
                                    FROM Pack";

                var reader = cmd.ExecuteReader();
                var packs = new List<Pack>();
                while (reader.Read())
                {
                    var pack = new Pack()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        Name = DbUtils.GetString(reader, "Name"),
                        Description = DbUtils.GetString(reader, "Description"),
                        Image = DbUtils.GetString(reader, "Image")
                    };
                    packs.Add(pack);
                }

                reader.Close();
                return packs;
            }
        }
    }

    public Pack GetByIdWithPackItems(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
	                                    p.Id,
	                                    p.[Name],
	                                    p.[Description],
	                                    p.[Image],
	                                    [pi].Id as PackItemId,
	                                    [pi].ItemId as PackItemItemId,
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
	                                    s.[Image] as SeriesImage
                                    FROM Pack p
                                    LEFT JOIN PackItem [pi]
	                                    ON p.Id = [pi].PackId
                                    LEFT JOIN Item i
	                                    ON [pi].ItemId = i.Id
                                    LEFT JOIN [Type] t
	                                    ON i.TypeId = t.Id
                                    LEFT JOIN Series s
	                                    ON i.SeriesId = s.Id
                                    WHERE p.Id = @Id";

                DbUtils.AddParameter(cmd, "@Id", id);
                var reader = cmd.ExecuteReader();

                Pack pack = null;
                while (reader.Read())
                {
                    if (pack == null)
                    {
                        pack = new Pack()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Image = DbUtils.GetString(reader, "Image"),
                            PackItems = new List<PackItem>()
                        };
                    }

                    if (DbUtils.IsNotDbNull(reader, "PackItemId"))
                    {
                        var packItem = new PackItem()
                        {
                            Id = DbUtils.GetInt(reader, "PackItemId"),
                            PackId = DbUtils.GetInt(reader, "Id"),
                            ItemId = DbUtils.GetInt(reader, "PackItemItemId"),
                            Item = new Item()
                            {
                                Id = DbUtils.GetInt(reader, "PackItemItemId"),
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
                        };

                        pack.PackItems.Add(packItem);
                    }
                }

                reader.Close();
                return pack;
            }
        }
    }
}