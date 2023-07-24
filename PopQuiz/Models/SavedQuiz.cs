namespace PopQuiz.Models
{
    public class SavedQuiz
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int QuizId { get; set; }

        public Quiz Quiz { get; set; }
    }
}
