namespace MCCC_Co_.Models;

public class Item
{
    public int Id { get; set; }
    public int? TypeId { get; set; }
    public int? SeriesId { get; set; }
    public int? Height { get; set; }
    public int? Width { get; set; }
    public int? Depth { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    public double Price { get; set; }
    public int? PurchaseCount { get; set; }

    public Type? Type { get; set; }
    public Series? Series { get; set; }
}