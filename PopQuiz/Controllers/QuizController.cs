using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PopQuiz.Repositories;
using PopQuiz.Models;

namespace PopQuiz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IQuizRepository _quizRepository;

        public QuizController(IQuizRepository quizRepository)
        {
            _quizRepository = quizRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_quizRepository.GetAll());
        }

        [HttpGet("GetWithQuestions{id}")]

        public IActionResult Get(int id)
        {
            var quiz = _quizRepository.GetByIdWithQuestions(id);
            if(quiz == null)
            {
                return NotFound();
            }
            return Ok(quiz);
        }

        [HttpPost("add")]

        public IActionResult Post(Quiz quiz)
        {
            if(quiz == null)
            {
                return BadRequest();
            }
            _quizRepository.Add(quiz);
            return CreatedAtAction("Get", new { id = quiz.Id }, quiz);
        }
    }
}
