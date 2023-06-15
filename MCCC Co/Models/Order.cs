namespace MCCC_Co_.Models;

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int? ShippingAddressId { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime? DateCompleted { get; set; }
    public int? RewardsUsed { get; set; }
    public double? TotalValue { get; set; }
    public double? TotalPaid { get; set; }
    public string? ConfirmationNumber { get; set; }
    public string? ShipCompanyName { get; set; }
    public string? ShipLineOne { get; set; }
    public string? ShipLineTwo{ get; set; }
    public string? ShipCity { get; set; }
    public string? ShipState { get; set; }
    public string? ShipZIPCode { get; set; }
    public string? ShipCountry { get; set; }

    public User? User { get; set; }
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}