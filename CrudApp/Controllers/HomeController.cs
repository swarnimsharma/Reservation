using System.Linq;
using System.Web.Mvc;
using CrudApp.Models;
using System.Data.Entity;
using log4net;
using System;
using System.Data.Entity.Validation;
using System.Text;
using System.Web;

namespace CrudApp.Controllers
{
    public class HomeController : Controller
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(HomeController));

        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult _Courses()
        {
            using (Pluto_AspNetMvcEntities dbmodel = new Pluto_AspNetMvcEntities())
            {
                try
                {
                    Log.Info("Hi I am log4net Info Level");
                }
                catch (Exception ex)
                {
                    Log.Error("Error in Home Controller/Index", ex);
                }
                return PartialView(dbmodel.Courses.ToList());
            }
        }

        // GET: Home/Details/5
        [HttpGet]
        public JsonResult Details(int id)
        {
            using (Pluto_AspNetMvcEntities dbmodel = new Pluto_AspNetMvcEntities())
            {
                var data = dbmodel.Courses.Where(x => x.Id == id).Select(x => new
                {
                    x.Description,
                    x.FullPrice,
                    x.Id,
                    x.Level,
                    x.Name,
                    x.AuthorId
                }).FirstOrDefault();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Create(Course courses)
        {
            try
            {
                // TODO: Add insert logic here
                using (Pluto_AspNetMvcEntities dbmodel = new Pluto_AspNetMvcEntities())
                {
                    dbmodel.Courses.Add(courses);
                    dbmodel.SaveChanges();
                }

                return RedirectToAction("Index");
            }
            catch (DbEntityValidationException e)
            {
                StringBuilder sb = new StringBuilder();
                foreach (var eve in e.EntityValidationErrors)
                {
                    sb.AppendLine(string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                                                    eve.Entry.Entity.GetType().Name,
                                                    eve.Entry.State));
                    foreach (var ve in eve.ValidationErrors)
                    {
                        sb.AppendLine(string.Format("- Property: \"{0}\", Error: \"{1}\"",
                                                    ve.PropertyName,
                                                    ve.ErrorMessage));
                    }
                }
                throw new DbEntityValidationException(sb.ToString(), e);
            }
            catch (Exception ex)
            {
                return RedirectToAction("Index");
            }
        }

        // GET: Home/Edit/5
        public ActionResult Edit(int id)
        {
            using (Pluto_AspNetMvcEntities dbmodel = new Pluto_AspNetMvcEntities())

                return View(dbmodel.Courses.Where(x => x.Id == id).FirstOrDefault());
        }

        // POST: Home/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, Course courses)
        {
            try
            {
                // TODO: Add update logic here
                using (Pluto_AspNetMvcEntities dbmodel = new Pluto_AspNetMvcEntities())
                {
                    dbmodel.Entry(courses).State = EntityState.Modified;
                    dbmodel.SaveChanges();
                }

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Home/Delete/5
        public ActionResult Delete(int id)
        {
            using (Pluto_AspNetMvcEntities dbmodel = new Pluto_AspNetMvcEntities())
                return View(dbmodel.Courses.Where(x => x.Id == id).FirstOrDefault());
        }

        // POST: Home/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here
                using (Pluto_AspNetMvcEntities dbmodel = new Pluto_AspNetMvcEntities())
                {
                    Course course = dbmodel.Courses.Where(x => x.Id == id).FirstOrDefault();
                    dbmodel.Courses.Remove(course);
                    dbmodel.SaveChanges();
                }

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        public ActionResult Register()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }
    }
}