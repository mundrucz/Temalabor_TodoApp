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
                        Title = "First title",
                        Note = "First Description",
                        DeadLine = DateTime.Parse("2022-2-12"),
                        State = ToDo.ToDoStates.todo,
                        Number = 1
                    },

                    new ToDo
                    {
                        Title = "2nd title",
                        Note = "2nd Description",
                        DeadLine = DateTime.Parse("2022-2-12"),
                        State = ToDo.ToDoStates.postphoned,
                        Number = 1
                    },

                    new ToDo
                    {
                        Title = "3rd title",
                        Note = "3rd Description",
                        DeadLine = DateTime.Parse("2022-2-12"),
                        State = ToDo.ToDoStates.done,
                        Number = 1
                    },

                    new ToDo
                    {
                        Title = "4th title",
                        Note = "4th Description",
                        DeadLine = DateTime.Parse("2022-2-12"),
                        State = ToDo.ToDoStates.inprogress,
                        Number = 1
                    },

                    new ToDo
                    {
                        Title = "5th title",
                        Note = "5th Description",
                        DeadLine = DateTime.Parse("2022-2-12"),
                        State = ToDo.ToDoStates.todo,
                        Number = 2
                    },

                    new ToDo
                    {
                        Title = "6th title",
                        Note = "6th Description",
                        DeadLine = DateTime.Parse("2022-2-12"),
                        State = ToDo.ToDoStates.todo,
                        Number = 3
                    },

                    new ToDo
                    {
                        Title = "7th title",
                        Note = "7th Description",
                        DeadLine = DateTime.Parse("2022-2-12"),
                        State = ToDo.ToDoStates.inprogress,
                        Number = 2
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
