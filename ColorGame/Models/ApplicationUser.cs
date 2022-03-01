using Microsoft.AspNetCore.Identity;

namespace ColorGame.Models
{
    public class ApplicationUser : IdentityUser
    {
        public BestScore? BestScore { get; set; }
    }
}