# GuitarQuest.Site

Landing page comercial do GuitarQuest, criada para apresentar o MVP e apoiar o lançamento do produto.

## Executar localmente

O projeto é estático e não exige instalação de dependências:

```powershell
python -m http.server 4173
```

Abra `http://127.0.0.1:4173`.

## Configurar os links públicos

Edite `site.config.js` e informe:

- `instagramUrl`: perfil oficial do Instagram;
- `productUrl`: endereço público do MVP.

Enquanto os endereços estiverem vazios, o site exibe apenas chamadas honestas de pré-lançamento.

## Estrutura

- `index.html`: conteúdo e estrutura semântica;
- `styles.css`: identidade visual e responsividade;
- `script.js`: menu, animações, demonstração interativa e FAQ;
- `site.config.js`: URLs públicas centralizadas;
- `assets/`: identidade visual.
