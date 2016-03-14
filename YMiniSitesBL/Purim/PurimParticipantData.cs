using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using YMiniSitesDAL.Purim;

namespace YMiniSitesBL.Purim
{
    [Serializable]
    public class PurimParticipantData
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string City { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public string DressName { get; set; }
        public string PictureUrl { get; set; }
        public DateTime CreateDate { get; set; }
        public bool HomePage { get; set; }
        public bool Active { get; set; }
        public bool Archive { get; set; }
        public DateTime UpdateDate { get; set; }

        public int Save()
        {
            return PurimDataSource.Instance.SaveParticipant
                (
                    FullName,
                    Phone,
                    City,
                    Email,
                    Age,
                    DressName,
                    PictureUrl
                );            
        }

        public static IEnumerable<PurimParticipantData> FindAll()
        {
            DataTable dt = PurimDataSource.Instance.GetAllParticipants();
            return CreateParticipants(dt);
        }

        public static PurimParticipantData Find(object id)
        {
            DataTable dt = PurimDataSource.Instance.GetParticipant((int)id);
            return CreateParticipants(dt).FirstOrDefault();
        }

        public static IEnumerable<PurimParticipantData> FindActive(bool homePageOnly = false)
        {
            DataTable dt = PurimDataSource.Instance.GetActiveParticipants(homePageOnly);
            return CreateParticipants(dt);
        }

        private static IEnumerable<PurimParticipantData> CreateParticipants(DataTable dt)
        {
            if (dt != null)
            {
                return dt.AsEnumerable().Select(p => new PurimParticipantData()
                {
                    Id = p.Field<int>("Id"),
                    FullName = p.Field<string>("FullName"),
                    Phone = p.Field<string>("Phone"),
                    City = p.Field<string>("City"),
                    Email = p.Field<string>("Email"),
                    Age = p.Field<int>("Age"),
                    DressName = p.Field<string>("DressName"),
                    PictureUrl = p.Field<string>("PictureUrl"),
                    CreateDate = p.Field<DateTime>("CreateDate"),
                    HomePage = p.Field<bool>("HomePage"),
                    Active = p.Field<bool>("Active"),
                    Archive = p.Field<bool>("Archive"),
                    UpdateDate = p.Field<DateTime>("UpdateDate")
                }).ToList();
            }
            else
            {
                return null;
            }
        }
    }
}