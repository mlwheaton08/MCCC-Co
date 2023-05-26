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

    public User? User { get; set; }
    public UserShippingAddress? ShippingAddress { get; set; }
    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}