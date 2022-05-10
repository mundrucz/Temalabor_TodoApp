using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoApp_Backend.Models
{
    public class ToDo
    {
        public enum ToDoStates { todo = 0, inprogress = 1, done = 2, postphoned = 3 }
        public long? Id { get; set; }
        public string Title { get; set; }
        public string Note { get; set; }
        public int Number { get; set; }
        public DateTime DeadLine { get; set; }
        public ToDoStates State { get; set; }

    }
    
}
