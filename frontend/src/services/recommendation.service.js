const calculateScore = (product, selectedPreferences, selectedFeatures) => {
  const prefMatches = selectedPreferences.filter((pref) =>
    product.preferences.includes(pref),
  ).length;

  const featMatches = selectedFeatures.filter((feat) =>
    product.features.includes(feat),
  ).length;

  return prefMatches + featMatches;
};

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products = [],
) => {
  if (!products.length) return [];

  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType,
  } = formData;

  const productsWithScore = products
    .map((product) => ({
      ...product,
      score: calculateScore(product, selectedPreferences, selectedFeatures),
    }))
    .filter((product) => product.score > 0);

  if (productsWithScore.length === 0) return [];

  if (selectedRecommendationType === 'SingleProduct') {
    const maxScore = Math.max(...productsWithScore.map((p) => p.score));
    const topProducts = productsWithScore.filter((p) => p.score === maxScore);
    return [topProducts[topProducts.length - 1]];
  }

  if (selectedRecommendationType === 'MultipleProducts') {
    return productsWithScore;
  }

  return [];
};

export default { getRecommendations };
