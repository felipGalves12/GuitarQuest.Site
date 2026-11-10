# GuitarQuest.Site

Landing page comercial do GuitarQuest, criada para apresentar o MVP e apoiar o lançamento do produto.

## Executar localmente

O projeto é estático e não exige instalação de dependências:

```powershell
python -m http.server 4173
```

Abra `http://127.0.0.1:4173`.

## Links públicos

Os endereços públicos ficam centralizados em `site.config.js`:

- Instagram: `https://www.instagram.com/guitarquest7/`;
- MVP: `https://app.guitarquest.tech`.
- preço público do Pro: `R$ 29,90` (deve acompanhar o valor cadastrado no app e na Stripe).

## Publicar no Coolify

- Build strategy: `Static`;
- Base Directory: `/`;
- sem comando de build;
- domínio principal: `guitarquest.tech`;
- `www.guitarquest.tech` redirecionando para o domínio principal.

## Estrutura

- `index.html`: conteúdo e estrutura semântica;
- `styles.css`: identidade visual e responsividade;
- `pricing.css`: seção responsiva dos planos Free e Pro;
- `script.js`: menu, animações, carrossel acessível, demonstração interativa e FAQ;
- `site.config.js`: URLs públicas centralizadas;
- `assets/brand/`: identidade visual oficial do GuitarQuest;
- `assets/screens/`: telas reais usadas no carrossel do produto.
