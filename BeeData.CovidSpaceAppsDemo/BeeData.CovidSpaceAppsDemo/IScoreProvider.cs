using System;

namespace BeeData.CovidSpaceAppsDemo
{
    public interface IScoreProvider
    {
        double GetScore(DateTime dateTime);
    }
}