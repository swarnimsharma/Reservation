using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp.Models
{
    public class ReservationTableDetails
    {
        public int Id { get; set; }
        public System.DateTime StartDate { get; set; }
        public System.DateTime EndDate { get; set; }
        public string Total_Table_Number { get; set; }
        public string Total_Person { get; set; }
        public string Booking_Id { get; set; }

    }
}