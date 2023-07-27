using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PopQuiz.Models;
using PopQuiz.Utils;
using System.Collections.Generic;

namespace PopQuiz.Repositories
{
    public class DifficultyRepository : BaseRepository, IDifficultyRepository
    {
        public DifficultyRepository(IConfiguration configuration) : base(configuration) { }

        public List<Difficulty> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select * from Difficulty";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var allDifficulties = new List<Difficulty>();

                        while (reader.Read())
                        {
                            var difficulty = new Difficulty()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            };
                            allDifficulties.Add(difficulty);
                        }
                        return allDifficulties;
                    }
                }
            }
        }
    }
}
