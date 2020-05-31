using FluentFTP;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;

namespace BeeData.CovidSpaceAppsDemo.SampleImplementations
{

    public class WorldCarbonDioxidePreScoreProvider : IPreScoreProvider
    {

        private readonly IDictionary<(int, int), double> records;
        readonly double min, range;

        public WorldCarbonDioxidePreScoreProvider()
        {
            var client = new FtpClient("ftp://aftp.cmdl.noaa.gov");
            var stream = new MemoryStream();
            client.Download(stream, "/products/trends/co2/co2_mm_mlo.txt");
            stream.Seek(0, SeekOrigin.Begin);
            var text = new StreamReader(stream).ReadToEndAsync().Result;
            var lines = text.Split('\n');
            lines = lines.Where(l => !l.StartsWith("#")).ToArray();
            records = new Dictionary<(int, int), double>();
            for (int i = 0; i < lines.Length - 1; i++)
            {
                records.Add((int.Parse(lines[i].Substring(0, 4)), int.Parse(lines[i].Substring(6, 2).Trim())), double.Parse(lines[i].Substring(38, 6)));
            }
            min = records.Values.Min();
            var max = records.Values.Max();
            range = max - min;
        }

        public double GetPreScore(DateTime dateTime)
        {
            return 1 - ((records[(dateTime.Year, dateTime.Month)] - min) / range);
        }

    }

}