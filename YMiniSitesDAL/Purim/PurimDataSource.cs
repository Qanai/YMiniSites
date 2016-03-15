using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.EnterpriseLibrary.Data.Sql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace YMiniSitesDAL.Purim
{
    public class PurimDataSource
    {
        private string connStr = string.Empty;
        private static PurimDataSource instance = null;
        private SqlDatabase db = null;

        private PurimDataSource()
        {
            try
            {
                //connStr = ConfigurationManager.ConnectionStrings["Purim"].ConnectionString;
                db = EnterpriseLibraryContainer.Current.GetInstance<Database>("Purim") as SqlDatabase;
            }
            catch
            { }
        }
        
        public static PurimDataSource Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new PurimDataSource();
                }
                return instance;
            }
        }


        public int SaveParticipant(string fullName, string phone, string city, string email, int age,
            string dressName, string pictureUrl)
        {
            List<DbParameter> dbParams = new List<DbParameter>()
            {
                new SqlParameter("@FullName", fullName),
                new SqlParameter("@DressName", dressName),
                new SqlParameter("@Phone", phone),
                new SqlParameter("@Email", email),
                new SqlParameter("@Age", age),
                new SqlParameter("@PictureUrl", pictureUrl),
                new SqlParameter("@City", city)
            };

            DbCommand cmd = CreateCommand("SetPurimContact", dbParams);
            int contactId = Convert.ToInt32(db.ExecuteScalar(cmd));
            return contactId;
        }

        public DataTable GetAllParticipants()
        {
            return FindParticipantsData();
        }

        public DataTable GetParticipant(int id)
        {
            Dictionary<string, object> query = new Dictionary<string, object>() { { "Id", id.ToString() } };
            return FindParticipantsData(query);
        }
        
        //public DataTable GetActiveParticipants(bool onlyHomePage = false)
        public DataTable GetActiveParticipants()
        {
            Dictionary<string, object> query = new Dictionary<string, object>() { { "Active", 1 } };
            //if (onlyHomePage)
            //{
            //    query.Add("HomePage", 1);
            //}
            return FindParticipantsData(query);
        }

        private DataTable FindParticipantsData(Dictionary<string, object> queryData = null)
        {
            DataTable participants = null;

            string query = "SELECT * FROM [dbo].[Purim2016]";
            if (queryData != null)
            {
                query = string.Format
                    (
                        "{0} WHERE {1}",
                        query,
                        string.Join(" AND ", queryData.Select(q => string.Format("{0} = {1}", q.Key, q.Value)).ToArray())
                    );
            }

            DbCommand cmd = CreateCommand(query);

            DataSet ds = db.ExecuteDataSet(cmd);
            if (ds != null && ds.Tables.Count > 0)
            {
                participants = ds.Tables[0];
            }

            return participants;
        }

        /// <summary>
        /// Creating the stored procdure command with 
        /// </summary>
        /// <param name="procedureName">The name of the stored procdure.</param>
        /// <param name="parameters">The parameters list</param>
        /// <returns></returns>
        private DbCommand CreateCommand(string procedureName, List<DbParameter> parameters)
        {
            DbCommand command = db.GetStoredProcCommand(procedureName);
            command.CommandType = CommandType.StoredProcedure;

            if (parameters != null)
            {
                foreach (DbParameter parameter in parameters)
                {
                    command.Parameters.Add(parameter);
                }
            }

            return command;
        }

        private DbCommand CreateCommand(string sqlQueryString)
        {
            DbCommand command = db.GetSqlStringCommand(sqlQueryString);
            command.CommandType = CommandType.Text;

            return command;
        }
    }
}