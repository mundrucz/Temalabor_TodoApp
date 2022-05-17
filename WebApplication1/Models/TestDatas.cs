using Microsoft.EntityFrameworkCore;

namespace ToDoApp_Backend.Models
{
    public class TestDatas
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new TodoContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<TodoContext>>()))
            {
                // Look for any Todos.
                if (context.TodoItems.Any())
                {
                    return;   // DB has been seeded
                }

                context.TodoItems.AddRange(
                    new ToDo
                    {
                        Title = "Feed the Dog",
                        Note = "He's hungry",
                        DeadLine = DateTime.Parse("2022-2-10"),
                        State = ToDo.ToDoStates.todo,
                        Number = 0
                    },

                    new ToDo
                    {
                        Title = "Eat",
                        Note = "Chocholate",
                        DeadLine = DateTime.Parse("2022-2-22"),
                        State = ToDo.ToDoStates.postphoned,
                        Number = 0
                    },

                    new ToDo
                    {
                        Title = "Meeting",
                        Note = "Important!",
                        DeadLine = DateTime.Parse("2022-2-02"),
                        State = ToDo.ToDoStates.done,
                        Number = 0
                    },

                    new ToDo
                    {
                        Title = "Go for a walk",
                        Note = "in the forest",
                        DeadLine = DateTime.Parse("2022-2-19"),
                        State = ToDo.ToDoStates.inprogress,
                        Number = 0
                    },

                    new ToDo
                    {
                        Title = "Get racoons",
                        Note = "a lot",
                        DeadLine = DateTime.Parse("2022-2-12"),
                        State = ToDo.ToDoStates.todo,
                        Number = 1
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
