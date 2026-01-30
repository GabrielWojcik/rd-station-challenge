import React, { useState, useRef } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const recommendationsRef = useRef(null);

  function updateRecommendations(data) {
    setRecommendations(data);
    recommendationsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-white border-b border-[#D1D5E4] py-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl font-semibold text-[#001825]">
            Recomendador de Produtos RD Station
          </h1>
        </div>
      </header>
      <main className="flex flex-col items-center py-8 px-4 bg-gray-100">
        <div className="bg-white p-8 rounded-xl border border-[#D1D5E4] shadow-sm mb-8 leading-relaxed w-full max-w-5xl">
          <p className="text-base text-gray-700">
            Bem-vindo ao <strong>Recomendador de Produtos RD Station</strong>.
            Aqui você pode encontrar uma variedade de produtos da RD Station,
            cada um projetado para atender às necessidades específicas do seu
            negócio. De CRM a Marketing, de Conversas a Inteligência Artificial,
            temos uma solução para ajudar você a alcançar seus objetivos. Use o
            formulário abaixo para selecionar suas preferências e
            funcionalidades desejadas e receba recomendações personalizadas de
            produtos que melhor atendam às suas necessidades.
          </p>
        </div>
        <div className="bg-white p-4 sm:p-8 rounded-xl border border-[#D1D5E4] shadow-sm w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Form updateRecommendations={updateRecommendations} />
          </div>
          <div>
            <RecommendationList
              recommendations={recommendations}
              ref={recommendationsRef}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
