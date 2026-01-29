import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import mockProducts from './mocks/mockProducts';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

jest.mock('./hooks/useProducts', () => () => ({
  preferences: [
    'Integração fácil com ferramentas de e-mail',
    'Automação de marketing',
    'Integração com chatbots',
  ],
  features: ['Rastreamento de interações com clientes'],
  products: mockProducts,
  loading: false,
}));

describe('App - Testes de Integração', () => {
  describe('Fluxo de recomendação', () => {
    test('exibe recomendação ao selecionar preferência e tipo SingleProduct', async () => {
      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByLabelText('Integração fácil com ferramentas de e-mail'),
        ).toBeInTheDocument();
      });

      const preferenceCheckbox = screen.getByLabelText(
        'Integração fácil com ferramentas de e-mail',
      );
      const singleProductRadio = screen.getByLabelText('Produto Único');
      const submitButton = screen.getByRole('button', {
        name: /obter recomendação/i,
      });

      userEvent.click(preferenceCheckbox);
      userEvent.click(singleProductRadio);
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
      });
    });

    test('exibe múltiplas recomendações ao selecionar MultipleProducts', async () => {
      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByLabelText('Automação de marketing'),
        ).toBeInTheDocument();
      });

      const preferenceCheckbox = screen.getByLabelText('Automação de marketing');
      const featureCheckbox = screen.getByLabelText(
        'Rastreamento de interações com clientes',
      );
      const multipleProductsRadio = screen.getByLabelText('Múltiplos Produtos');
      const submitButton = screen.getByRole('button', {
        name: /obter recomendação/i,
      });

      userEvent.click(preferenceCheckbox);
      userEvent.click(featureCheckbox);
      userEvent.click(multipleProductsRadio);
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('RD Station CRM')).toBeInTheDocument();
      });
      expect(screen.getByText('RD Station Marketing')).toBeInTheDocument();
    });

    test('limpa recomendações ao clicar no botão Limpar', async () => {
      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByLabelText('Integração com chatbots'),
        ).toBeInTheDocument();
      });

      const preferenceCheckbox = screen.getByLabelText('Integração com chatbots');
      const singleProductRadio = screen.getByLabelText('Produto Único');
      const submitButton = screen.getByRole('button', {
        name: /obter recomendação/i,
      });

      userEvent.click(preferenceCheckbox);
      userEvent.click(singleProductRadio);
      userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('RD Conversas')).toBeInTheDocument();
      });

      const clearButton = screen.getByRole('button', { name: /limpar/i });
      userEvent.click(clearButton);

      await waitFor(() => {
        expect(screen.queryByText('RD Conversas')).not.toBeInTheDocument();
      });
    });
  });

  describe('Estado inicial', () => {
    test('exibe mensagem de aguardando seleção quando não há recomendações', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('Aguardando suas escolhas.')).toBeInTheDocument();
      });
    });

    test('botão de submit está desabilitado inicialmente', async () => {
      render(<App />);

      await waitFor(() => {
        const submitButton = screen.getByRole('button', {
          name: /obter recomendação/i,
        });
        expect(submitButton).toBeDisabled();
      });
    });
  });
});
