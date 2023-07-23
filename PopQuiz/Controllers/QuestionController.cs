using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PopQuiz.Repositories;
using PopQuiz.Models;

namespace PopQuiz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionRepository _questionRepository;

        public QuestionController(IQuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
        }

        [HttpGet("GetByQuizId/{quizId}")]

        public IActionResult Get(int quizId) { 
        
            return Ok(_questionRepository.GetAllByQuiz(quizId));
        }

        [HttpPost("add")]

        public IActionResult Post(Question question)
        {
            if(question == null)
            {
                return BadRequest();
            }
            _questionRepository.Add(question);
            return CreatedAtAction("Get", new { id = question.Id }, question);
        }

        [HttpPut("update/{id}")]

        public IActionResult Put(int id, Question question)
        {
            if(id != question.Id)
            {
                return BadRequest();
            }
            _questionRepository.Update(question);
            return NoContent();
        }
    }
}
