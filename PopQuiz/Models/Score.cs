namespace PopQuiz.Models
{
    public class Score
    {
        public int Id { get; set; }

        public int MyScore { get; set; }

        public int QuizId { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}
