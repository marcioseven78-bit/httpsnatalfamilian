# Natal Família — versão visual revisada

Esta versão mantém a estrutura original do projeto e aprimora o visual da loja:
- cores e espaçamentos refinados;
- melhor apresentação do banner, categorias e cartões de produtos;
- ajustes para telas pequenas;
- textos de segurança mais cuidadosos.

## Publicação
1. Faça backup do repositório atual.
2. Extraia este ZIP.
3. Envie os arquivos para o mesmo repositório GitHub, mantendo a estrutura de pastas.
4. A Netlify deverá iniciar um novo deploy se o repositório estiver conectado.

## Antes de divulgar a loja
- Faça um pedido de teste e confirme se `/api/products` e `/api/orders` funcionam na publicação.
- Confirme com seu banco que a chave PIX configurada em `netlify/server/pix.ts` pertence à loja.
- O fluxo atual gera um QR Code e registra o pedido, mas não implementa confirmação automática do pagamento. Confirme o recebimento no banco antes de enviar produtos.
- O número de WhatsApp da loja não foi incluído porque não consta nos arquivos recebidos. Não invente nem use um número de terceiros.
- Confirme preços, disponibilidade, prazo/frete e política de troca antes de anunciar.

Esta atualização não foi publicada na Netlify; é um pacote de arquivos pronto para você aplicar ao repositório.
