using System;
using System.Collections.Generic;
using System.Linq;

namespace BeeData.CovidSpaceAppsDemo
{

    public class ScoreProvider : IScoreProvider
    {

        private readonly ICollection<IPreScoreProvider> preScoreProviders;
        private readonly IDictionary<IPreScoreProvider, double> preScoreWeights;

        public ScoreProvider(IDictionary<IPreScoreProvider, double> providers)
        {
            preScoreWeights = providers;
            preScoreProviders = providers.Keys;
        }

        public double GetScore(DateTime dateTime)
        {
            var totalWeight = preScoreWeights.Values.Sum();
            return preScoreProviders.AsParallel().Sum(psp => psp.GetPreScore(dateTime) * (preScoreWeights[psp] / totalWeight));
        }

    }

}