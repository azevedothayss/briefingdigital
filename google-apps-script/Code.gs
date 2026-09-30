const DESTINATARIO = 'azevedothayss@gmail.com';
const ETAPAS = [
{"title":"Você e seu negócio","intro":"Primeiro, quero entender quem está por trás da marca.","fields":[
{"id":"q1","label":"Seu nome completo","type":"text","required":true,"placeholder":"Maria Silva","autocomplete":"name"},
{"id":"q2","label":"Nome do seu negócio ou marca","type":"text","hint":"Se ainda não tem um nome, pode deixar em branco.","placeholder":"Clínica Sorriso, Studio Ana"},
{"id":"q3","label":"Área de atuação","type":"select","required":true,"options":["Saúde e Estética","Odontologia","Gastronomia","Moda e Beleza","Educação","Serviços Profissionais","Varejo / Comércio","Fitness e Bem-estar","Tecnologia","Outro"]},
{"id":"q3outro","label":"Qual área?","type":"text","placeholder":"Descreva sua área","required":true,"when":{"id":"q3","value":"Outro"}},
{"id":"q4","label":"Descreva brevemente o que você oferece","type":"textarea","required":true,"hint":"Seus principais serviços ou produtos.","placeholder":"Atendo consultas de harmonização facial e corporal, com foco em procedimentos minimamente invasivos…"},
{"id":"q5","label":"Tempo de mercado","type":"select","options":["Menos de 1 ano","1 a 3 anos","3 a 5 anos","5 a 10 anos","Mais de 10 anos","Estou começando agora"]},
{"id":"q6","label":"Cidade / Região","type":"text","placeholder":"Muriaé, MG"},
{"id":"q7","label":"Tipo de atendimento","type":"radio","options":["Presencial","Online / Remoto","Ambos (presencial e online)"]}]},
{"title":"Formalização e estrutura","intro":"Seu repertório e sua estrutura também fazem parte do posicionamento.","fields":[
{"id":"q8","label":"Você possui CNPJ ou MEI?","type":"radio","options":["Sim, tenho CNPJ","Sim, sou MEI","Estou em processo de abertura","Não possuo"]},
{"id":"q9","label":"Razão social ou nome fantasia registrado","type":"text","hint":"Se possui CNPJ ou MEI, informe o nome registrado.","placeholder":"Maria Silva Estética LTDA"},
{"id":"q10","label":"Formação acadêmica principal","type":"text","hint":"Sua graduação ou formação técnica na área de atuação.","placeholder":"Biomedicina, Odontologia, Administração…"},
{"id":"q11","label":"Cursos, especializações ou certificações relevantes","type":"textarea","hint":"Liste os que considera mais importantes para o seu posicionamento.","placeholder":"Pós-graduação em Harmonização Orofacial, MBA em Gestão…"}]},
{"title":"Presença digital atual","intro":"Vamos olhar para o que já existe e para os canais que você utiliza.","fields":[
{"id":"q12","label":"Quais redes sociais você utiliza?","type":"checkbox","exclusive":"Nenhuma","options":["Instagram","Facebook","TikTok","LinkedIn","YouTube","Nenhuma"]},
{"id":"q13","label":"Link do seu perfil no Instagram","type":"url","hint":"Pode ser um perfil profissional ou pessoal com conteúdo profissional.","placeholder":"https://instagram.com/seuperfil"},
{"id":"q14","label":"Com que frequência você publica hoje?","type":"radio","options":["Todos os dias","Algumas vezes por semana","Algumas vezes por mês","Raramente ou nunca","Não tenho redes sociais profissionais"]},
{"id":"q15","label":"Você possui site ou landing page?","type":"radio","options":["Sim","Não"]},
{"id":"q15site","label":"Link do seu site","type":"url","required":true,"when":{"id":"q15","value":"Sim"},"placeholder":"https://seusite.com.br"},
{"id":"q16","label":"Perfil da empresa no Google (Google Meu Negócio)","type":"select","options":["Sim, configurado","Já ouvi falar, mas não tenho","Não sei o que é"]},
{"id":"q17","label":"WhatsApp Business","type":"select","options":["Sim, uso profissionalmente","Uso o WhatsApp pessoal para o negócio","Não uso WhatsApp para o negócio"]},
{"id":"q18","label":"Já investiu em tráfego pago (anúncios)?","type":"radio","options":["Sim, com bons resultados","Sim, mas não tive resultados claros","Nunca investi"]}]},
{"title":"Seu público e mercado","intro":"Uma boa estratégia começa por entender quem você quer alcançar.","fields":[
{"id":"q19","label":"Quem é o seu cliente ideal?","type":"textarea","required":true,"hint":"Descreva o perfil, o que busca e suas dores ou necessidades.","placeholder":"Mulheres de 25 a 45 anos que buscam resultados naturais e valorizam segurança…"},
{"id":"q20","label":"Quais são seus principais concorrentes?","type":"textarea","hint":"Pode citar nomes, perfis ou empresas da mesma região e nicho.","placeholder":"Clínica X (@clinicax), Studio Y…"},
{"id":"q21","label":"O que diferencia seu trabalho dos concorrentes?","type":"textarea","placeholder":"Atendimento, formação específica, técnica, localização, experiência…"}]},
{"title":"Identidade e referências","intro":"Quero conhecer a imagem que você tem hoje e a que deseja construir.","fields":[
{"id":"q22","label":"Você já possui um logotipo?","type":"radio","options":["Sim, tenho logotipo profissional","Tenho algo simples / improvisado","Não tenho","Está em desenvolvimento"]},
{"id":"q23","label":"Possui cores definidas para a marca?","type":"text","hint":"Se sim, descreva ou informe nomes e códigos das cores.","placeholder":"Azul marinho, dourado e branco / #1A3A5C"},
{"id":"q24","label":"Perfis ou marcas que você admira visualmente","type":"textarea","hint":"Podem ser de qualquer área. Conte o que chama sua atenção.","placeholder":"@studioY: gosto da paleta e do visual limpo…"},
{"id":"q25","label":"Que sensação quer que o cliente tenha ao ver seu perfil?","type":"textarea","placeholder":"Confiança, profissionalismo, modernidade, acolhimento…"}]},
{"title":"Objetivos e expectativas","intro":"O que você deseja mudar e por que este é o momento de começar?","fields":[
{"id":"q26","label":"Por que está buscando esse serviço agora?","type":"textarea","required":true,"placeholder":"Estou abrindo meu consultório e quero uma comunicação profissional desde o início…"},
{"id":"q27","label":"O que você espera conquistar?","type":"checkbox","required":true,"hint":"Marque tudo o que se aplica.","options":["Atrair novos clientes","Fortalecer autoridade","Divulgar serviços","Conteúdo educativo","Profissionalizar imagem","Aumentar seguidores"]},
{"id":"q28","label":"Em quanto tempo espera ver resultados?","type":"radio","options":["1 a 3 meses","3 a 6 meses","6 meses a 1 ano","Não tenho pressa, quero fazer bem feito"]},
{"id":"q29","label":"Já trabalhou com social media ou agência antes?","type":"textarea","placeholder":"Conte como foi. O que funcionou e o que não funcionou?"}]},
{"title":"Investimento e contato","intro":"Estas respostas ajudam a definir um escopo possível para sua rotina e seu negócio.","fields":[
{"id":"q30","label":"Qual sua faixa de investimento mensal para marketing digital?","type":"radio","options":["Até R$ 500","R$ 500 a R$ 1.500","R$ 1.500 a R$ 3.000","Acima de R$ 3.000","Prefiro receber opções e decidir depois"]},
{"id":"q31","label":"Disponibilidade para reuniões de alinhamento","type":"radio","options":["Semanal","Quinzenal","Mensal"]},
{"id":"q32","label":"Disponibilidade para gravação de conteúdo","type":"radio","hint":"Fotos e vídeos com você, sua equipe ou seu ambiente de trabalho.","options":["Tenho disponibilidade total","Posso agendar com antecedência","Tenho pouca disponibilidade","Prefiro não aparecer em conteúdos"]},
{"id":"q33","label":"Melhor horário para contato","type":"text","placeholder":"De manhã, antes das 10h / À noite, após 19h"},
{"id":"q34","label":"Telefone ou WhatsApp para contato","type":"tel","placeholder":"(00) 00000-0000","autocomplete":"tel"},
{"id":"q35","label":"E-mail para receber sua cópia","type":"email","required":true,"hint":"Você receberá uma cópia organizada das respostas e dos anexos neste endereço.","placeholder":"seu@email.com","autocomplete":"email"}]},
{"title":"Finalização","intro":"Últimos detalhes. Depois, você poderá conferir tudo antes de enviar.","fields":[
{"id":"q36","label":"Tem alguma dúvida, preocupação ou algo que gostaria de compartilhar?","type":"textarea","placeholder":"Fique à vontade para contar qualquer observação, expectativa ou receio."},
{"id":"q37","label":"Como conheceu meu trabalho?","type":"radio","options":["Indicação de alguém","Instagram","LinkedIn","Google","Já nos conhecemos pessoalmente","Outro"]}]}];
const LIMITE_ANEXOS = 10 * 1024 * 1024;
const LIMITE_ARQUIVO = 5 * 1024 * 1024;

function doGet() {
  const page = HtmlService.createTemplateFromFile('Index');
  page.runtime = JSON.stringify({mode:'gas', token:criarToken_(), startedAt:Date.now()});
  return page.evaluate().setTitle('Diagnóstico digital | Thais Azevedo')
    .addMetaTag('viewport','width=device-width, initial-scale=1');
}

// Execute uma vez no editor para autorizar somente o envio de e-mails.
function verificarConfiguracao() {
  const info = {destinatario:DESTINATARIO, destinatariosDisponiveis:MailApp.getRemainingDailyQuota(), link:ScriptApp.getService().getUrl()};
  console.log(JSON.stringify(info));
  return info;
}

function criarToken_() {
  const lock=LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const props=PropertiesService.getScriptProperties();
    let secret=props.getProperty('TOKEN_SECRET');
    if(!secret){secret=Utilities.getUuid()+Utilities.getUuid();props.setProperty('TOKEN_SECRET',secret);}
    const body=Date.now()+'.'+Utilities.getUuid();
    return body+'.'+Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(body,secret));
  } finally {lock.releaseLock();}
}
function validarToken_(token) {
  if(typeof token!=='string')throw Error('Atualize a página para continuar. Seu rascunho foi mantido.');
  const parts=token.split('.');
  const now=Date.now(),at=Number(parts[0]);
  if(parts.length!==3 || !at || at>now+60000 || now-at>6*60*60*1000)throw Error('Sua sessão expirou. Atualize a página; o rascunho será mantido.');
  const secret=PropertiesService.getScriptProperties().getProperty('TOKEN_SECRET');
  if(!secret)throw Error('Atualize a página para continuar.');
  const sig=Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(parts[0]+'.'+parts[1],secret));
  if(parts[2]!==sig)throw Error('Atualize a página para continuar.');
  if(now-at<3000)throw Error('Confira suas respostas antes de enviar.');
}
function hash_(s){return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,s));}
function escapeHtml_(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function ativo_(f,a){return !f.when || a[f.when.id]===f.when.value;}
function validarRespostas_(raw) {
  if(!raw || typeof raw!=='object' || Array.isArray(raw))throw Error('Confira as respostas antes de enviar.');
  const a={};
  ETAPAS.forEach(step=>step.fields.forEach(f=>{
    const v=raw[f.id];
    if(f.type==='checkbox'){
      if(v!==undefined && !Array.isArray(v))throw Error('Confira o campo: '+f.label);
      a[f.id]=Array.from(new Set(v||[]));
      if(a[f.id].some(x=>typeof x!=='string'||f.options.indexOf(x)===-1))throw Error('Confira o campo: '+f.label);
      if(f.exclusive && a[f.id].indexOf(f.exclusive)!==-1 && a[f.id].length>1)throw Error('Escolha “Nenhuma” ou as redes utilizadas.');
    }else{
      if(v!==undefined && typeof v!=='string')throw Error('Confira o campo: '+f.label);
      a[f.id]=(v||'').trim();
      if(a[f.id].length>2000)throw Error('Use até 2.000 caracteres em '+f.label+'.');
      if(f.options && a[f.id] && f.options.indexOf(a[f.id])===-1)throw Error('Confira o campo: '+f.label);
    }
  }));
  ETAPAS.forEach(step=>step.fields.forEach(f=>{
    if(!ativo_(f,a)){a[f.id]='';return;}
    if(f.required && !a[f.id].length)throw Error('Preencha: '+f.label+'.');
    if(f.type==='url' && a[f.id] && !/^https?:\/\/[^\s<>]+\.[^\s<>]+$/i.test(a[f.id]))throw Error('Informe um link completo em '+f.label+'.');
  }));
  a.q35=a.q35.toLowerCase();
  if(!/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(a.q35) || a.q35.length>254)throw Error('Informe um e-mail válido para receber sua cópia.');
  return a;
}
function prepararAnexos_(files) {
  if(!Array.isArray(files)||files.length>4)throw Error('Anexe no máximo 4 arquivos.');
  let total=0;
  return files.map((f,i)=>{
    if(!f || typeof f.content!=='string' || f.content.length>Math.ceil(LIMITE_ARQUIVO*4/3)+8 || !/^[A-Za-z0-9+/]*={0,2}$/.test(f.content))throw Error('Anexo inválido. Remova o arquivo e tente novamente.');
    const bytes=Utilities.base64Decode(f.content),b=bytes.map(x=>(x+256)%256);
    if(!bytes.length || bytes.length>LIMITE_ARQUIVO)throw Error('Cada anexo pode ter até 5 MB.');
    total+=bytes.length;if(total>LIMITE_ANEXOS)throw Error('Os anexos juntos podem ter até 10 MB.');
    let mime='',ext='';
    if(b[0]===255&&b[1]===216&&b[2]===255){mime='image/jpeg';ext='jpg';}
    else if([137,80,78,71,13,10,26,10].every((n,k)=>b[k]===n)){mime='image/png';ext='png';}
    else if(b[0]===37&&b[1]===80&&b[2]===68&&b[3]===70&&b[4]===45){mime='application/pdf';ext='pdf';}
    else if(b[0]===82&&b[1]===73&&b[2]===70&&b[3]===70&&b[8]===87&&b[9]===69&&b[10]===66&&b[11]===80){mime='image/webp';ext='webp';}
    else throw Error('Use somente arquivos PDF, JPG, PNG ou WEBP.');
    const name=String(f.name||'arquivo').replace(/[\u0000-\u001f\/\\<>:"|?*]/g,'_').replace(/\.[^.]*$/,'').slice(0,100);
    return Utilities.newBlob(bytes,mime,(i+1)+'-'+(name||'arquivo')+'.'+ext);
  });
}
function compilar_(a,receipt,files) {
  const when=Utilities.formatDate(new Date(),'America/Sao_Paulo','dd/MM/yyyy HH:mm');
  let text='DIAGNÓSTICO DIGITAL | THAIS AZEVEDO\nMarketing, conteúdo e posicionamento digital\nProtocolo: '+receipt+'\nData: '+when+'\n';
  let html='<div style="max-width:760px;margin:auto;font:15px/1.6 Arial,sans-serif;color:#241828"><div style="padding:28px;background:#241828;color:#FAF8F5"><h1 style="margin:0;font-size:25px">Diagnóstico digital</h1><p style="margin:6px 0">Thais Azevedo</p><p style="margin:0;font-size:13px">Marketing, conteúdo e posicionamento digital</p></div><p>Recebemos as respostas de <strong>'+escapeHtml_(a.q1)+'</strong>. Esta mensagem é a cópia enviada à Thais e à pessoa que preencheu o formulário.</p><p><strong>Protocolo:</strong> '+receipt+'<br><strong>Data:</strong> '+when+' (Brasília)</p>';
  ETAPAS.forEach((step,i)=>{
    text+='\n'+(i+1)+'. '+step.title.toUpperCase()+'\n';
    html+='<h2 style="font-size:19px;border-bottom:2px solid #FF675C;padding-bottom:8px;margin-top:30px">'+(i+1)+'. '+escapeHtml_(step.title)+'</h2><table style="width:100%;border-collapse:collapse">';
    step.fields.forEach(f=>{
      if(!ativo_(f,a))return;
      const value=(Array.isArray(a[f.id])?a[f.id].join(', '):a[f.id])||'Não informado';
      text+=f.label+':\n'+value+'\n\n';
      html+='<tr><td style="padding:12px 0;border-bottom:1px solid #DED6DE"><strong>'+escapeHtml_(f.label)+'</strong><br>'+escapeHtml_(value).replace(/\n/g,'<br>')+'</td></tr>';
    });html+='</table>';
  });
  const names=files.map(f=>f.getName());
  text+='\nANEXOS\n'+(names.length?names.join('\n'):'Nenhum anexo')+'\n\nContato: '+DESTINATARIO+'\nWhatsApp: https://wa.me/5531992836383';
  html+='<h2 style="font-size:19px">Anexos</h2><p>'+escapeHtml_(names.length?names.join(', '):'Nenhum anexo')+'</p><p>O resumo em TXT também está anexado para facilitar a consulta.</p><p style="border-top:1px solid #DED6DE;padding-top:20px">Marcas mais humanas comunicam melhor.<br><a style="color:#552A7B" href="https://wa.me/5531992836383">Conversar com Thais no WhatsApp</a></p></div>';
  return {text:text,html:html};
}
function submitBriefing(payload) {
  try {
    if(!payload || payload.website)throw Error('Não foi possível enviar. Confira suas respostas.');
    validarToken_(payload.token);
    if(!/^[a-zA-Z0-9_-]{16,80}$/.test(payload.id||''))throw Error('Atualize a página para continuar.');
    if(payload.consent!==true)throw Error('Confirme o envio das respostas e dos anexos.');
    const a=validarRespostas_(payload.answers),files=prepararAnexos_(payload.files||[]);
    const digest=hash_(JSON.stringify(a)+JSON.stringify(payload.files||[]));
    const lock=LockService.getScriptLock();lock.waitLock(20000);
    try {
      const p=PropertiesService.getScriptProperties(),key='request_'+payload.id,prev=p.getProperty(key);
      if(prev){
        const old=JSON.parse(prev);
        if(old.digest!==digest)throw Error('Este envio já foi registrado com outras respostas. Inicie um novo briefing.');
        if(old.status==='sent')return {ok:true,receipt:old.receipt};
        throw Error('Este envio precisa ser conferido antes de uma nova tentativa. Fale com Thais pelo WhatsApp e informe o protocolo '+old.receipt+'.');
      }
      const now=Date.now(),day=Utilities.formatDate(new Date(),'America/Sao_Paulo','yyyyMMdd');
      const recipients=a.q35===DESTINATARIO?1:2;
      if(MailApp.getRemainingDailyQuota()<recipients)throw Error('O limite de envio foi atingido. Suas respostas foram mantidas. Tente novamente mais tarde ou fale com Thais.');
      let count=JSON.parse(p.getProperty('DAY_COUNT')||'{"day":"","count":0}');
      if(count.day!==day)count={day:day,count:0};
      if(count.count>=40)throw Error('O limite de envio foi atingido hoje. Seu rascunho foi mantido.');
      const emailKey='rate_'+hash_(a.q35),last=Number(p.getProperty(emailKey)||0);
      if(now-last<5*60*1000)throw Error('Um briefing deste e-mail foi enviado há pouco. Aguarde alguns minutos antes de enviar outro.');
      // Expire receipt metadata. Answers and attachments are not stored on the server.
      const all=p.getProperties();Object.keys(all).forEach(k=>{
        if(k.indexOf('request_')===0){try{if(now-JSON.parse(all[k]).at>30*86400000)p.deleteProperty(k);}catch(e){}}
        else if(k.indexOf('rate_')===0 && now-Number(all[k])>86400000)p.deleteProperty(k);
      });
      const receipt='DDA-'+day+'-'+Utilities.getUuid().slice(0,8).toUpperCase();
      const output=compilar_(a,receipt,files);
      if(Utilities.newBlob(output.html).getBytes().length>190000)throw Error('As respostas ficaram muito longas. Reduza os textos e tente novamente.');
      const record={at:now,status:'sending',receipt:receipt,digest:digest};
      p.setProperty(key,JSON.stringify(record));
      const summary=Utilities.newBlob(output.text,'text/plain','diagnostico-'+receipt+'.txt');
      const message={to:DESTINATARIO,subject:'Diagnóstico digital | '+(a.q2||a.q1).replace(/[\r\n]/g,' ').slice(0,100),body:output.text,htmlBody:output.html,name:'Thais Azevedo',replyTo:a.q35,attachments:[summary].concat(files)};
      if(a.q35!==DESTINATARIO)message.cc=a.q35;
      try {MailApp.sendEmail(message);} catch(e){record.status='needs_check';p.setProperty(key,JSON.stringify(record));throw Error('Não conseguimos confirmar o envio. Seu rascunho foi mantido. Fale com Thais e informe '+receipt+'.');}
      record.status='sent';count.count++;
      p.setProperties({[key]:JSON.stringify(record),[emailKey]:String(now),DAY_COUNT:JSON.stringify(count)});
      return {ok:true,receipt:receipt};
    } finally {lock.releaseLock();}
  } catch(e) {return {ok:false,message:e.message||'Não foi possível enviar. Seu rascunho foi mantido.'};}
}
