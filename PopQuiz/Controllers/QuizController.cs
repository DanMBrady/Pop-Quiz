﻿using Microsoft.AspNetCore.Http;
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

        [HttpGet("GetByUser/{id}")]

        public IActionResult GetByUser(int id)
        {
            return Ok(_quizRepository.GetAllByUser(id));
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

        [HttpPut("update/{id}")]

        public IActionResult Put(int id, Quiz quiz)
        {
            if(id != quiz.Id)
            {
                return BadRequest();
            }
            _quizRepository.Update(quiz);
            return NoContent();
        }

        [HttpDelete("{id}")]

        public IActionResult Delete(int id)
        {
            _quizRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]

        public IActionResult Search(string q)
        {
            return Ok(_quizRepository.GetAllBySearch(q));
        }
    }
}
