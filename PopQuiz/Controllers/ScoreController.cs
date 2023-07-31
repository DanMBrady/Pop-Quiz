using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PopQuiz.Models;
using PopQuiz.Repositories;

namespace PopQuiz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreController : ControllerBase
    {
        private readonly IScoreRepository _scoreRepository;

        public ScoreController(IScoreRepository scoreRepository)
        {
            _scoreRepository = scoreRepository;
        }

        [HttpGet("GetbyQuiz/{quizId}")]

        public IActionResult Get(int quizId) { 
        
            return Ok(_scoreRepository.GetAllFromQuiz(quizId));
        }

        [HttpPost("add")]

        public IActionResult Post(Score score)
        {
            if(score == null)
            {
                return BadRequest();
            }
            _scoreRepository.Add(score);
            return Ok(score);
        }
    }
}
