using log4net;
using System;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Web.Mvc;

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

        public PartialViewResult _GetReservationList()
        {
            using (ReservationEntities dbmodel = new ReservationEntities())
            {
                try
                {
                    Log.Info("Hi I am log4net Info Level"); //We can add log message here Accordingly..
                }
                catch (Exception ex)
                {
                    Log.Error("Error in Home Controller/Index", ex);
                }
                return PartialView(dbmodel.ReservationForTables.ToList());
            }
        }


        [HttpGet]
        public JsonResult GetReservationDetails(int id)
        {
            using (ReservationEntities dbmodel = new ReservationEntities())
            {
                var data = dbmodel.ReservationForTables.Where(x => x.Id == id).Select(x => new
                {
                    x.Total_Person,
                    x.Total_Table_Number,
                    x.StartDate,
                    x.EndDate,
                    x.Locations
                }).FirstOrDefault();
                return Json(data, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult ReserveTable(ReservationForTable reservation)
        {
            try
            {

                using (ReservationEntities dbmodel = new ReservationEntities())
                {
                    dbmodel.ReservationForTables.Add(reservation);
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


        public ActionResult EditReservedTable(int id)
        {
            using (ReservationEntities dbmodel = new ReservationEntities())
                return View(dbmodel.ReservationForTables.Where(x => x.Id == id).FirstOrDefault());
        }


        [HttpPost]
        public ActionResult EditReservedTable(int id, ReservationForTable reservation)
        {
            try
            {

                using (ReservationEntities dbmodel = new ReservationEntities())
                {
                    dbmodel.Entry(reservation).State = EntityState.Modified;
                    dbmodel.SaveChanges();
                }

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}