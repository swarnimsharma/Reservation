

namespace CrudApp
{
    using System;
    using System.Collections.Generic;

    public partial class ReservationForTable
    {
        public int Id { get; set; }
        public System.DateTime StartDate { get; set; }
        public System.DateTime EndDate { get; set; }
        public string Total_Table_Number { get; set; }
        public string Total_Person { get; set; }
        public string Locations { get; set; }
    }
}
