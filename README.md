# Diagnóstico digital | Thais Azevedo

Site novo, sem fotos, com a identidade visual aprovada. O conteúdo anterior do repositório foi substituído; o histórico Git permite recuperá-lo.

## O que funciona

- Interface para mobile e desktop, com Montserrat e Playfair Display incorporadas.
- 37 perguntas em oito etapas, com campos condicionais e revisão antes de enviar.
- Respostas salvas no mesmo navegador e dispositivo. Os anexos ficam no IndexedDB; o site avisa quando o navegador não consegue salvá-los.
- Anexos opcionais: até quatro PDF/JPG/PNG/WEBP, até 5 MB por arquivo e 10 MB no total.
- Botão e ícone de WhatsApp: https://wa.me/5531992836383.
- Backend Google Apps Script para enviar um e-mail organizado a **azevedothayss@gmail.com**, com cópia para a pessoa que respondeu, os anexos e um resumo em TXT.
- Validação também no servidor, controle de quota e de repetição de envio. A interface não simula confirmação de e-mail.
- PNGs transparentes de logo, monograma, símbolos e ícones em `assets/`.

## Ativação necessária para enviar e-mails

O frontend está completo. **O envio real depende de implantar os três arquivos de `google-apps-script/` na conta Google da Thais e autorizar o envio de e-mail.** Nenhuma senha ou chave foi incluída no código.

Siga [ATIVAR_EMAIL.md](ATIVAR_EMAIL.md). Depois da implantação, o link `/exec` já abre o formulário completo. Para usar também o endereço do GitHub Pages, copie esse link para `appsScriptUrl` em `config.js`; a página do GitHub encaminhará o cliente para a versão com envio ativo.

Antes da ativação, o botão de envio informa que o serviço está indisponível, preservando o rascunho. Os botões de baixar respostas e de contato continuam disponíveis.

## Limites da versão gratuita

A cota atual de Apps Script para conta Gmail pessoal é de 100 destinatários por dia, compartilhada com outros scripts da conta. Uma resposta normalmente consome dois destinatários. Este projeto limita a operação a **40 formulários por dia**, preservando uma margem para outros usos, e aceita no máximo um novo envio por e-mail a cada cinco minutos.

A hospedagem pelo Apps Script dispensa domínio próprio. O salvamento é local: não sincroniza entre dispositivos. Navegação privada, limpeza de dados ou bloqueios de armazenamento podem impedir a retomada.

O servidor conserva por até 30 dias somente protocolo, horário, hash e estado de envio para evitar duplicatas. Não armazena as respostas nem os anexos em planilhas ou pastas: esses materiais são entregues por e-mail.

Se a API de e-mail retornar uma falha após iniciar o envio, o protocolo fica pendente de conferência. O sistema não repete esse envio automaticamente, pois a mensagem pode ter sido aceita. Confira o protocolo na sua caixa de entrada antes de qualquer novo envio manual.

## Arquivos

- `index.html`, `styles.css`, `app.js`, `schema.js`: interface estática.
- `config.js`: link público do Apps Script após ativação.
- `data/schema.json`: perguntas e opções.
- `google-apps-script/Code.gs`: validação, compilação e envio.
- `google-apps-script/Index.html`: a mesma interface, com assets e fontes incorporados e chamada nativa ao Apps Script.
- `google-apps-script/appsscript.json`: permissões e configuração.
- `assets/fonts/`: fontes oficiais e licenças SIL OFL.
- `tools/build-gas.py`: atualiza a versão autocontida após mudanças na interface ou perguntas.
- `tests/`: verificações de backend e interface.

## Desenvolvimento e verificação

```sh
python3 -m http.server 8000
```

Abra http://localhost:8000. O preview local não envia e-mails.

```sh
npm install
npm run test:backend
npx playwright install chromium
npm run test:ui
python3 tools/build-gas.py
```

Para usar um Chrome já instalado, defina `CHROME_PATH` antes do teste de interface. Os testes de envio são simulados: não enviam mensagens para pessoas reais. A entrega real deve ser verificada após a autorização Google.

Validação realizada: navegação, obrigatórios, campos condicionais, revisão e edição, retomada de respostas e anexos, falha/sucesso de envio, destinatários, HTML escapado, quota, duplicidade e telas 1440/390/320 px, incluindo texto ampliado.

Referências oficiais: [Web Apps](https://developers.google.com/apps-script/guides/web), [MailApp](https://developers.google.com/apps-script/reference/mail/mail-app), [Quotas](https://developers.google.com/apps-script/guides/services/quotas).
