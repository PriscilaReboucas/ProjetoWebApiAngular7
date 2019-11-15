using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using WebApiLivro.Models;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace WebApiLivro.Acesso
{
    public class AppDbContext: DbContext
    {
        public AppDbContext() : base("name=AppDbContext") { }
        public virtual DbSet<Livro> Livros { get; set; }
       
    }
}