namespace PopQuiz.Models
{
    public class Question
    {
        public int Id { get; set; } 

        public int QuizId { get; set; }

        public string MyQuestion { get; set; }

        public string AnswerOne { get; set; }

        public string AnswerTwo { get; set; }

        public string AnswerThree { get; set; }

        public string AnswerFour { get; set; }

        public string CorrectAnswer { get; set; }



    }
}
