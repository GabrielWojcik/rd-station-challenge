import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';
import Button from '../shared/Button';

function Form({ updateRecommendations }) {
  const { preferences, features, products, loading } = useProducts();
  const { formData, handleChange, resetForm } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const isFormValid =
    (formData.selectedPreferences.length > 0 ||
      formData.selectedFeatures.length > 0) &&
    formData.selectedRecommendationType !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataRecommendations = getRecommendations(formData);
    updateRecommendations(dataRecommendations);
  };

  return (
    <form
      className="p-4 bg-white rounded-3xl shadow-md border"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        selectedPreferences={formData.selectedPreferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        selectedFeatures={formData.selectedFeatures}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        selectedRecommendationType={formData.selectedRecommendationType}
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <div className="flex flex-col gap-2">
        <SubmitButton
          text="Obter recomendação"
          disabled={!isFormValid || loading}
        />
        <Button text="Limpar" variant="secondary" onClick={resetForm} />
      </div>
    </form>
  );
}

export default Form;
