using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace BeeData.CovidSpaceAppsDemo.SampleImplementations
{

    public class WorldTemperatureAnomalyPreScoreProvider : IPreScoreProvider
    {

        private readonly IDictionary<int, double> anomalies;
        readonly double min, range;

        public WorldTemperatureAnomalyPreScoreProvider()
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Accept", "*/*");
            var response = client.GetAsync("https://data.giss.nasa.gov/gistemp/graphs/graph_data/Global_Mean_Estimates_based_on_Land_and_Ocean_Data/graph.txt").Result;
            var text = response.Content.ReadAsStringAsync().Result;
            var lines = text.Split('\n');
            anomalies = new Dictionary<int, double>();
            for (int i = 5; i < lines.Length; i++)
            {
                anomalies.Add(int.Parse(lines[i].Substring(0, 4)), double.Parse(lines[i].Substring(9, 5)));
            }
            min = anomalies.Values.Min();
            var max = anomalies.Values.Max();
            range = max - min;
        }

        public double GetPreScore(DateTime dateTime)
        {
            return 1 - ((anomalies[dateTime.Year] - min) / range);
        }

    }

}