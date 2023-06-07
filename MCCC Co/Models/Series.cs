namespace MCCC_Co_.Models;

public class Series
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Alloy { get; set; }
    public int? BrightnessLevel { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }

    public List<string> Applications { get; set; } = new List<string>();
}