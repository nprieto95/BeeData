using BeeData.CovidSpaceAppsDemo.SampleImplementations;
using System;
using System.Collections.Generic;

namespace BeeData.CovidSpaceAppsDemo.SampleClient
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Bee Data demo for SpaceApps COVID-19 edition - 1.0");
            Console.WriteLine("Loading providers...");
            var preScoreProviders = new Dictionary<IPreScoreProvider, double>
            {
                { new WorldCarbonDioxidePreScoreProvider(), 1 }
            };
            Console.WriteLine("\n=================================");
            Console.WriteLine("Using the following providers:");
            foreach (var item in preScoreProviders.Keys)
            {
                Console.WriteLine($"Relative weight: {preScoreProviders[item]}\tProvider: {item.GetType().Name.Replace("PreScoreProvider", string.Empty)}");
            }
            var scoreProvider = new ScoreProvider(preScoreProviders);
            Console.WriteLine("=================================\n\nResults:");
            for (int i = 1989; i < 2020; i++)
            {
                Console.WriteLine($"Year: {i}\tScore: {scoreProvider.GetScore(new DateTime(i, 1, 1))}");
            }
            Console.ReadKey();
        }
    }
}
