using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using ToDoApp_Backend.Models;

namespace BackendTests
{
    [TestClass]
    public class Test
    {
        readonly MemoryDatabase memoryDatabase = MemoryDatabase.Create();
        readonly ToDo todo = new ToDo
            {
                Title = "title",
                Note = "Description",
                DeadLine = DateTime.Parse("2022-2-12"),
                State = ToDo.ToDoStates.todo,
                Number = 3

            };

    [TestMethod]
        async public Task TestGet()
        {
            var client = memoryDatabase.CreateClient();
            var response = await client.GetAsync("/api/todos");
            var todoList = await response.Content.ReadFromJsonAsync<List<ToDo>>();

            Assert.AreEqual(todoList.Count, 7);
            Assert.IsTrue(response.IsSuccessStatusCode);
        }

        [TestMethod]
        async public Task TestPost()
        {
            var client = memoryDatabase.CreateClient();
            var response = await client.PostAsJsonAsync<ToDo>("/api/todos", todo);
            var todoList = await response.Content.ReadFromJsonAsync<ToDo>();

            Assert.AreEqual(todoList.Note, todo.Note);
            Assert.AreEqual(todoList.Title, todo.Title);
            Assert.AreEqual(todoList.DeadLine, todo.DeadLine);
            Assert.AreEqual(todoList.State, todo.State);
            Assert.IsTrue(response.IsSuccessStatusCode);

        }

        [TestMethod]
        async public Task TestPut() {
            var client = memoryDatabase.CreateClient();

            ToDo changedTodo = new ToDo
            {
                Title = "changedTitle",
                Note = "changedDescription",
                DeadLine = DateTime.Parse("2022-2-01"),
                State = ToDo.ToDoStates.inprogress,
                Number = 0

            };

            var response = await client.PostAsJsonAsync<ToDo>("/api/todos", todo);

            var responseTodo = await response.Content.ReadFromJsonAsync<ToDo>();
            changedTodo.Id = responseTodo.Id; ;


            var response2 = await client.PutAsJsonAsync<ToDo>("/api/todos/"+ responseTodo.Id.ToString(), changedTodo);

            response = await client.GetAsync("/api/todos");

            var todoList = await response.Content.ReadFromJsonAsync<List<ToDo>>();

            var chosen = todoList.Find(x => x.Id == changedTodo.Id);

            Assert.IsNotNull(chosen);
            Assert.AreEqual(chosen.Note, changedTodo.Note);
            Assert.AreEqual(chosen.Title, changedTodo.Title);
            Assert.AreEqual(chosen.DeadLine, changedTodo.DeadLine);
            Assert.AreEqual(chosen.State, changedTodo.State);

            Assert.IsTrue(response.IsSuccessStatusCode);

        }

        [TestMethod]
        async public Task TestDelete()
        {
            var client = memoryDatabase.CreateClient();

            var response = await client.GetAsync("/api/todos");

            var todoList = await response.Content.ReadFromJsonAsync<List<ToDo>>();

            response = await client.DeleteAsync("/api/todos/" + todoList[0].Id.ToString());
            Assert.IsTrue(response.IsSuccessStatusCode);

            response = await client.GetAsync("/api/toods" + todoList[0].Id.ToString());
            var a = response.StatusCode;
            Assert.AreEqual(a, System.Net.HttpStatusCode.NotFound);
        }

    }
}