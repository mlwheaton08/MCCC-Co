namespace MCCC_Co_.Models;

public class UserShippingAddress
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string? NickName { get; set; }
    public string? CompanyName { get; set; }
    public string LineOne { get; set; }
    public string? LineTwo { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZIPCode { get; set; }
    public string Country { get; set; }
    public bool? IsDefault { get; set; }
}