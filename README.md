# Cleuton

Vitrine de 33 produtos com fotos, preços e pedidos pelo WhatsApp.

## Abrir localmente

Com Node.js instalado, execute `node preview.cjs` e abra `http://127.0.0.1:4173`.

## Deploy no EasyPanel com Dockerfile

O Dockerfile na raiz já inclui o site completo, servido por Nginx na porta interna **80**. O contêiner inclui verificação de saúde e valida a configuração do Nginx durante o build. Não precisa de Node.js, banco de dados, volumes ou variáveis de ambiente em produção.

1. Crie um serviço do tipo **App** no EasyPanel.
2. Em **Source**, selecione **GitHub** e configure:
   - Repositório: `m4rkoz1/site_cleuton`
   - Branch: `main`
   - Build Path: `/`
3. Em **Build**, escolha **Dockerfile** e informe `Dockerfile` como caminho.
4. Em **Domains**, configure `cleuton.com.br`, caminho `/`, protocolo interno HTTP e porta de destino **80**. Configure a mesma porta no domínio automático de teste, se usar.
5. Aponte o registro DNS **A** de `cleuton.com.br` para o IP público do servidor do EasyPanel. Se usar `www.cleuton.com.br`, adicione esse domínio ao serviço e configure seu DNS também.
6. Ative HTTPS no domínio e clique em **Deploy**. Confira o resultado do build e os logs do serviço.

Use o domínio do serviço para testar antes de mudar o DNS. Não é necessário publicar uma porta externa manualmente: o proxy do EasyPanel encaminha as requisições para a porta 80 do contêiner. Deixe o comando de inicialização padrão da imagem.

Referências: [App Service do EasyPanel](https://easypanel.io/docs/services/app) e [imagem oficial Nginx](https://hub.docker.com/_/nginx/).

### Testar com Docker localmente

```sh
docker build -t cleuton-site .
docker run --rm --name cleuton-site -p 80:80 cleuton-site
```

Abra `http://localhost:80`. Para consultar a saúde do contêiner, use `docker inspect --format '{{.State.Health.Status}}' cleuton-site`.

### Atualizar os produtos

Edite `dist/products.js`, atualize as fotos em `dist/assets/products/` quando necessário e envie para a branch `main`. Faça um novo **Deploy** no EasyPanel; se ativar **Auto Deploy** para a origem GitHub, o painel pode publicar os novos commits automaticamente.

## Arquivos

- `dist/index.html`: página da loja.
- `dist/products.js`: catálogo, preços, condições Pix e indicação de esgotados.
- `dist/app.js`: cartões e mensagens de compra pelo WhatsApp.
- `dist/hammock.css` e `dist/hammock.js`: balanço suave do Cleuton na rede, com botão para pausar e movimento reduzido.
- `dist/assets/`: mascotes e fotos dos produtos.
- `dist/style.css`, `dist/catalog.css`, `dist/creator.css`: estilos responsivos.

Os pedidos vão para (21) 98645-1095. O contato para criação de sites no rodapé vai para (21) 99861-3487.

Os valores e o estoque foram consultados em 08/10/2026 e precisam ser atualizados manualmente. A mensagem de compra pede confirmação da opção, valor, disponibilidade e entrega.

Publique o conteúdo de `dist` em uma hospedagem estática. O arquivo `.openai/hosting.json` mantém a identidade da hospedagem Sites usada na prévia. O domínio desejado é cleuton.com.br; a configuração de domínio ainda está pendente.
