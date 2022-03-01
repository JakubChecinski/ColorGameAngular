using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ColorGame.Models
{
    public class BestScore
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("User")]
        public string? UserId { get; set; } 
        public ApplicationUser? User { get; set; } 

        public decimal Value { get; set; }

    }
}
