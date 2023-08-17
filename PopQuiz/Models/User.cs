using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace PopQuiz.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        public string FirebaseId { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]

        public Boolean IsAdmin { get; set; }
    }
}
