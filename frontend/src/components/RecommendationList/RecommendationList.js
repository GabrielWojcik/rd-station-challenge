import { forwardRef } from 'react';

const RecommendationList = forwardRef(({ recommendations }, ref) => {
  return (
    <div
      ref={ref}
      className="max-w-md mx-auto p-4 bg-white rounded-3xl shadow-md border"
    >
      <h2 className="text-lg font-bold mb-4">Lista de Recomendações:</h2>

      {recommendations.length === 0 && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
            <img
              src="/assets/idea_icon.svg"
              alt="Aguardando seleção"
              width="40"
              height="40"
            />
          </div>
          <div>
            <p className="font-medium text-slate-500 text-center">
              Aguardando suas escolhas.
            </p>
            <p className="text-sm max-w-xs mx-auto text-slate-400 text-center">
              Selecione ao menos um objetivo ou funcionalidade para começarmos.
            </p>
          </div>
        </div>
      )}

      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index} className="mb-2">
            {recommendation.name}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default RecommendationList;
