using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiLivro.Acesso;
using WebApiLivro.Models;

namespace WebApiLivro.Controllers
{
    [RoutePrefix("api/livros")]
    public class LivrosController : ApiController
    {
        private AppDbContext db = new AppDbContext();

        // GET: api/Livros
        [HttpGet]
        [Route("todos")]
        public IQueryable<Livro> GetLivros()
        {
            return db.Livros.OrderBy(x=>x.Titulo);
        }

        // GET: api/Livros/5
        [ResponseType(typeof(Livro))]
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetLivro(int id)
        {
            Livro livro = db.Livros.Find(id);
            if (livro == null)
            {
                return NotFound();
            }

            return Ok(livro);
        }

        // PUT: api/Livros/5
        [ResponseType(typeof(void))]
        [HttpPut]
        [Route("alterar")]
        public IHttpActionResult PutLivro(int id, Livro livro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != livro.Id)
            {
                return BadRequest();
            }

            db.Entry(livro).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LivroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Livros
        [ResponseType(typeof(Livro))]
        [HttpPost]
        [Route("incluir")]
        public IHttpActionResult PostLivro(Livro livro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Livros.Add(livro);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = livro.Id }, livro);
        }

        // DELETE: api/Livros/5
        [ResponseType(typeof(Livro))]
        [HttpDelete]
        [Route("excluir")]
        public IHttpActionResult DeleteLivro(int id)
        {
            Livro livro = db.Livros.Find(id);
            if (livro == null)
            {
                return NotFound();
            }

            db.Livros.Remove(livro);
            db.SaveChanges();

            return Ok(livro);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LivroExists(int id)
        {
            return db.Livros.Count(e => e.Id == id) > 0;
        }
    }
}