﻿using PopQuiz.Models;
using System.Collections.Generic;

namespace PopQuiz.Repositories
{
    public interface IQuestionRepository
    {
        List<Question> GetAllByQuiz(int id);

        public void Add(Question question);

        public void Update(Question question);


        public void Delete(int id);
    }
}