using ColorGame.Data;
using ColorGame.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ColorGame.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class BestScoreController : ControllerBase
    {
        // note: in this mini-project, service and repository layers are ommitted
        // as we only want to access a single column in a single DB table

        private ApplicationDbContext context;
        public BestScoreController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public decimal Get()
        {
            var userId = GetUserId();
            if (userId == null) return 0.0m;
            BestScore? score = context.BestScores?.SingleOrDefault(x => x.UserId == userId);
            if (score == null) return 0.0m;
            else return score.Value;
        }

        [HttpPost("{score}")]
        public void Update(decimal score)
        {
            var userId = GetUserId();
            if (userId == null) return;
            var scoreToUpdate = context.BestScores?.FirstOrDefault(x => x.UserId == userId);
            if (scoreToUpdate != null) scoreToUpdate.Value = score;
            else context.BestScores?.Add(new BestScore() { UserId = userId, Value = score });
            context.SaveChanges();
        }

        private string? GetUserId()
        {
            if (User == null || User.Claims == null) return null;
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            return userId;
        }

    }
}