# Ativar o envio gratuito pelo Gmail

Esta etapa precisa ser feita na conta **azevedothayss@gmail.com**, pois o Google exige que você autorize o envio em seu nome. Não é necessário comprar domínio nem contratar Resend.

1. Acesse https://script.google.com/home/start com essa conta e crie um projeto chamado **Diagnóstico digital — Thais Azevedo**.
2. Abra o arquivo `Code.gs` do projeto. Substitua todo o conteúdo pelo arquivo [google-apps-script/Code.gs](google-apps-script/Code.gs) deste repositório. No GitHub, use **Raw** para copiar o arquivo completo.
3. No editor Google, clique em **+ → HTML** e dê o nome **Index**. Substitua o conteúdo pelo arquivo [google-apps-script/Index.html](google-apps-script/Index.html) completo. Esse arquivo já incorpora logo, ícones, fontes, estilo e formulário.
4. Em **Configurações do projeto**, habilite a opção de mostrar `appsscript.json`. Abra o arquivo e substitua seu conteúdo por [google-apps-script/appsscript.json](google-apps-script/appsscript.json).
5. Volte ao editor, selecione a função **verificarConfiguracao** e clique em **Executar**. Revise e conceda a autorização solicitada pelo Google. O código solicita apenas envio de e-mail; não solicita leitura da caixa de entrada. Essa função de verificação não envia uma mensagem.
6. Clique em **Implantar → Nova implantação → Aplicativo da Web**. Escolha **Executar como: você** e **Quem pode acessar: qualquer pessoa**. Clique em **Implantar** e copie a URL terminada em `/exec`.
7. Abra esse link e faça um envio real de teste com seu próprio nome e um e-mail sob seu controle. Confira a chegada das respostas, anexos e da cópia. O sucesso deve mostrar um protocolo `DDA-…`.
8. No GitHub, abra `config.js`, cole a URL `/exec` entre as aspas de `appsScriptUrl` e salve. Você também pode enviar o link à Thais/ao assistente para concluir essa alteração. O site do GitHub Pages passará a direcionar para o formulário com envio ativo.

O link `/dev` é de teste e não serve para compartilhar com clientes. Compartilhe a URL `/exec`.

Após alterações futuras no código Google, atualize a implantação para a nova versão em **Implantar → Gerenciar implantações**. Manter a mesma implantação preserva o link.

Se sua conta Google não oferecer acesso para qualquer pessoa, confira se você está usando a conta Gmail pessoal indicada. Contas administradas por empresas podem impor restrições.
