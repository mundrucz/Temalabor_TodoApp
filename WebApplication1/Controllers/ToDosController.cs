#nullable disable
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp_Backend.Models;

namespace ToDoApp_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDosController : ControllerBase
    {
        private readonly TodoContext _context;

        public ToDosController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/todos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDo>>> GetTodoItem()
        {
            return await _context.TodoItems.ToListAsync();
        }

        // GET: api/todos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDo>> GetTodoItem(long? id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // PUT: api/todos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long? id, ToDo todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/todos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ToDo>> PostTodoItem(ToDo todoItem)
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/todos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(long? id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();


            var state = todoItem.State;

            var list = _context.TodoItems.ToArray();
            List<ToDo> stateList = new();

            for (int i = 0; i < list.Length; i++)
            {
                if (list.ElementAt(i).State.Equals(state))
                {
                    stateList.Add(list.ElementAt(i));
                }

            }
            for (int i = 0; i < stateList.Count; i++)
            {
                stateList[i].Number = i;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoItemExists(long? id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }
    }
}
