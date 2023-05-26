namespace MCCC_Co_.Models;

public class User
{
    public int Id { get; set; }
    public string FirebaseId { get; set; }
    public bool IsAdmin { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public int? RewardsPoints { get; set; }

    public List<UserShippingAddress> Addresses { get; set; } = new List<UserShippingAddress>();
}