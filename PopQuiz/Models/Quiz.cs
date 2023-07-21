using System.Collections.Generic;

namespace PopQuiz.Models
{
    public class Quiz
    {
       public int Id { get; set; }

        public int UserCreatedId { get; set; }

        public User User { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public List<Question> Questions { get; set; }
    }
}
