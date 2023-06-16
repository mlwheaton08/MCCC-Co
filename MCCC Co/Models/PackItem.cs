namespace MCCC_Co_.Models;

public class PackItem
{
    public int Id { get; set; }
    public int PackId { get; set; }
    public int ItemId { get; set; }

    public Item? Item { get; set; }
}