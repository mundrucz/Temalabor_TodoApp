﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using ToDoApp_Backend.Models;

namespace BackendTests
{
    public class MemoryDatabase : WebApplicationFactory<Program>
    {
        private readonly SqliteConnection sqliteConnection;

        private MemoryDatabase()
        {
            this.sqliteConnection = new SqliteConnection(@"DataSource=:memory:");
            this.sqliteConnection.Open();
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                // Replace DB configuration
                var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<TodoContext>));
                if (descriptor != null)
                    services.Remove(descriptor);
                services.AddDbContext<TodoContext>(options => options.UseSqlite(sqliteConnection));

                // Build the service provider.
                var sp = services.BuildServiceProvider();

                // Ensure db is created (required for creating tables)
                using (var scope = sp.CreateScope())
                {
                    var db = scope.ServiceProvider.GetRequiredService<TodoContext>();
                    db.Database.EnsureCreated();
                }
            });
        }

        public static MemoryDatabase Create()
            => new MemoryDatabase();

        public void AddSeedEntities<T>(T[] entities)
        {
            using (var serviceScope = this.Services.CreateScope())
            {
                var db = serviceScope.ServiceProvider.GetRequiredService<TodoContext>();
                foreach (var e in entities)
                    db.Add(e);
                db.SaveChanges();
            }
        }

        public IReadOnlyCollection<T> GetDbTableContent<T>()
            where T : class
        {
            using (var serviceScope = this.Services.CreateScope())
            {
                var db = serviceScope.ServiceProvider.GetRequiredService<TodoContext>();
                return db.Set<T>().ToList();
            }
        }
    }
}
