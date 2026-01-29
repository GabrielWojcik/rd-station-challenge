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

  test('Botão "Limpar" reseta todos os campos do formulário', () => {
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

  test('Botão "Limpar" mantém formulário funcional após múltiplos usos', () => {
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
