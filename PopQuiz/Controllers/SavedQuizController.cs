using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PopQuiz.Models;
using PopQuiz.Repositories;

namespace PopQuiz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedQuizController : ControllerBase
    {
        private readonly ISavedQuizRepository _savedRepository;

        public SavedQuizController(ISavedQuizRepository savedRepository)
        {
            _savedRepository = savedRepository;
        }


        [HttpGet("GetByUserId/{userId}")]
        public IActionResult Get(int userId)
        {
            return Ok(_savedRepository.GetAllByUser(userId));
        }
        [HttpPost("add")]

        public IActionResult Post(SavedQuiz savedQuiz)
        {
            if(savedQuiz == null)
            {
                return BadRequest();
            }
            _savedRepository.Add(savedQuiz);
            return CreatedAtAction("Get", new { id = savedQuiz.Id }, savedQuiz);
        }

        [HttpDelete("{id}")]

        public IActionResult Delete(int id)
        {
            _savedRepository.Delete(id);
            return NoContent();
        }
    }
}
