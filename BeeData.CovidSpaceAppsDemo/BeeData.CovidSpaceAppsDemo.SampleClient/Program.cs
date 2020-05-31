using BeeData.CovidSpaceAppsDemo.SampleImplementations;
using System;
using System.Collections.Generic;

namespace BeeData.CovidSpaceAppsDemo.SampleClient
{
    class Program
    {
        static void Main(string[] args)
        {
            var preScoreProviders = new Dictionary<IPreScoreProvider, double>
            {
                { new WorldTemperatureAnomalyPreScoreProvider(), 1 }
            };
            var scoreProvider = new ScoreProvider(preScoreProviders);
            for (int i = 2009; i < 2019; i++)
            {
                Console.WriteLine(scoreProvider.GetScore(new DateTime(i, 1, 1)));
            }
        }
    }
}
