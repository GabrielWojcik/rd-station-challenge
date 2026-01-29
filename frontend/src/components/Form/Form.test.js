import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

jest.mock('../../hooks/useProducts', () => () => ({
  preferences: ['Automação de marketing', 'Integração com chatbots'],
  features: ['Gestão de leads', 'Email marketing'],
  products: [],
  loading: false,
}));

describe('Form', () => {
  const mockUpdateRecommendations = jest.fn();

  beforeEach(() => {
    mockUpdateRecommendations.mockClear();
  });

  describe('Botão Limpar', () => {
    test('reseta todos os campos do formulário', () => {
      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      const preferenceCheckbox = screen.getByLabelText('Automação de marketing');
      const featureCheckbox = screen.getByLabelText('Gestão de leads');
      const recommendationTypeRadio = screen.getByLabelText('Produto Único');

      userEvent.click(preferenceCheckbox);
      userEvent.click(featureCheckbox);
      userEvent.click(recommendationTypeRadio);

      expect(preferenceCheckbox).toBeChecked();
      expect(featureCheckbox).toBeChecked();
      expect(recommendationTypeRadio).toBeChecked();

      const clearButton = screen.getByRole('button', { name: /limpar/i });
      userEvent.click(clearButton);

      expect(preferenceCheckbox).not.toBeChecked();
      expect(featureCheckbox).not.toBeChecked();
      expect(recommendationTypeRadio).not.toBeChecked();
    });

    test('limpa as recomendações ao resetar', () => {
      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      const clearButton = screen.getByRole('button', { name: /limpar/i });
      userEvent.click(clearButton);

      expect(mockUpdateRecommendations).toHaveBeenCalledWith([]);
    });

    test('mantém formulário funcional após múltiplos usos', () => {
      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      const preferenceCheckbox = screen.getByLabelText('Integração com chatbots');
      const clearButton = screen.getByRole('button', { name: /limpar/i });

      userEvent.click(preferenceCheckbox);
      expect(preferenceCheckbox).toBeChecked();

      userEvent.click(clearButton);
      expect(preferenceCheckbox).not.toBeChecked();

      userEvent.click(preferenceCheckbox);
      expect(preferenceCheckbox).toBeChecked();

      userEvent.click(clearButton);
      expect(preferenceCheckbox).not.toBeChecked();
    });
  });

  describe('Botão Obter recomendação', () => {
    test('está desabilitado quando nenhuma seleção foi feita', () => {
      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      const submitButton = screen.getByRole('button', { name: /obter recomendação/i });
      expect(submitButton).toBeDisabled();
    });

    test('está desabilitado quando apenas preferência é selecionada sem tipo de recomendação', () => {
      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      const preferenceCheckbox = screen.getByLabelText('Automação de marketing');
      userEvent.click(preferenceCheckbox);

      const submitButton = screen.getByRole('button', { name: /obter recomendação/i });
      expect(submitButton).toBeDisabled();
    });

    test('está habilitado quando preferência e tipo de recomendação são selecionados', () => {
      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      const preferenceCheckbox = screen.getByLabelText('Automação de marketing');
      const recommendationTypeRadio = screen.getByLabelText('Produto Único');

      userEvent.click(preferenceCheckbox);
      userEvent.click(recommendationTypeRadio);

      const submitButton = screen.getByRole('button', { name: /obter recomendação/i });
      expect(submitButton).not.toBeDisabled();
    });

    test('está habilitado quando feature e tipo de recomendação são selecionados', () => {
      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      const featureCheckbox = screen.getByLabelText('Gestão de leads');
      const recommendationTypeRadio = screen.getByLabelText('Múltiplos Produtos');

      userEvent.click(featureCheckbox);
      userEvent.click(recommendationTypeRadio);

      const submitButton = screen.getByRole('button', { name: /obter recomendação/i });
      expect(submitButton).not.toBeDisabled();
    });
  });
});
