using System;

namespace BeeData.CovidSpaceAppsDemo
{

    public interface IPreScoreProvider
    {

        /// <summary>
        /// Returns a value between 0 and 1 representing the
        /// prescore of the associated data set for a given
        /// moment.
        /// </summary>
        /// <param name="dateTime">The moment to evaluate.</param>
        /// <returns></returns>
        double GetPreScore(DateTime dateTime);

    }

}