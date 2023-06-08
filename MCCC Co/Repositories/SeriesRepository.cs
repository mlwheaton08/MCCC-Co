using MCCC_Co_.Models;
using MCCC_Co_.Utils;

namespace MCCC_Co_.Repositories;

public class SeriesRepository : BaseRepository, ISeriesRepository
{
    public SeriesRepository(IConfiguration configuration) : base(configuration) { }

    public List<Series> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
	                                    s.Id,
	                                    [Name],
	                                    Alloy,
	                                    BrightnessLevel,
	                                    [Description],
	                                    [Image],
	                                    a.Id as ApplicationId,
	                                    [Case] as ApplicationCase
                                    FROM [Series] s
                                    LEFT JOIN SeriesApplication sa
	                                    ON s.Id = sa.SeriesId
                                    LEFT JOIN [Application] a
	                                    on sa.ApplicationId = a.Id";

                var reader = cmd.ExecuteReader();
                var series = new List<Series>();

                while (reader.Read())
                {
                    var seriesId = DbUtils.GetInt(reader, "Id");
                    var existingSeries = series.FirstOrDefault(s => s.Id == seriesId);
                    if (existingSeries == null)
                    {
                        existingSeries = new Series()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Alloy = DbUtils.GetString(reader, "Alloy"),
                            BrightnessLevel = DbUtils.GetNullableInt(reader, "BrightnessLevel"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Image = DbUtils.GetString(reader, "Image"),
                            Applications = new List<string>()
                        };

                        series.Add(existingSeries);
                    }

                    if (DbUtils.IsNotDbNull(reader, "ApplicationId"))
                    {
                        existingSeries.Applications.Add(DbUtils.GetString(reader, "ApplicationCase"));
                    }
                }

                reader.Close();
                return series;
            }
        }
    }
}