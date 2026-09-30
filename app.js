(()=>{
'use strict';
const schema=window.DIAGNOSTICO_SCHEMA, runtime=window.DIAGNOSTICO_RUNTIME||{}, config=window.DIAGNOSTICO_CONFIG||{};
if(runtime.mode!=='gas' && /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/.test(config.appsScriptUrl||'')){location.replace(config.appsScriptUrl);return;}
const $=id=>document.getElementById(id), KEY='thais-diagnostico-v1', DB='thais-diagnostico', LIMIT=10*1024*1024;
const uid=()=>crypto.randomUUID?crypto.randomUUID():('briefing-'+Date.now()+'-'+Math.random().toString(36).slice(2));
let state={version:1,id:uid(),step:0,answers:{},consent:false}, files=[],db=null,storageOK=true,fileStorageOK=true,returnReview=false,busy=false,view='welcome',compiled='';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const active=f=>!f.when||state.answers[f.when.id]===f.when.value;
const label=f=>f.label+(f.required?' <span class="req" aria-hidden="true">*</span>':'');
function save(){
 try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;}catch(e){storageOK=false;}
 $('save-status').textContent=storageOK?'Rascunho salvo neste navegador':'Rascunho não salvo neste navegador';
 $('welcome-storage').textContent=storageOK?'': 'Seu navegador bloqueou o salvamento. Mantenha esta página aberta ou baixe suas respostas.';
}
function openDB(){return new Promise(resolve=>{
 try{const request=indexedDB.open(DB,1);request.onupgradeneeded=()=>request.result.createObjectStore('draft');request.onerror=()=>resolve(null);request.onblocked=()=>resolve(null);request.onsuccess=()=>resolve(request.result);}catch(e){resolve(null);}
 });}
function storeFiles(){return new Promise(resolve=>{
 if(!db){fileStorageOK=false;resolve(false);return;}
 try{const tx=db.transaction('draft','readwrite');tx.objectStore('draft').put({id:state.id,files},'files');tx.oncomplete=()=>{fileStorageOK=true;resolve(true);};tx.onerror=tx.onabort=()=>{fileStorageOK=false;resolve(false);};}catch(e){fileStorageOK=false;resolve(false);}
 });}
function loadFiles(){return new Promise(resolve=>{
 if(!db){resolve([]);return;}const tx=db.transaction('draft','readonly');const req=tx.objectStore('draft').get('files');req.onsuccess=()=>resolve(req.result&&req.result.id===state.id?req.result.files:[]);req.onerror=()=>resolve([]);
 });}
async function clearAll(){
 state={version:1,id:uid(),step:0,answers:{},consent:false};files=[];returnReview=false;save();await storeFiles();renderFiles();
}
function setView(next){view=next;document.body.dataset.view=next;['welcome','workspace','success'].forEach(id=>$(id).hidden=id!==next);}
function scrollHeading(){setTimeout(()=>{const el=$('step-title');el.focus({preventScroll:true});el.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});},20);}
function nav(){
 $('step-nav').innerHTML=schema.map((s,i)=>`<button type="button" class="step-link ${validStep(i).length?'':'completed'}" data-step="${i}" ${state.step===i?'aria-current="step"':''}><span class="number">${String(i+1).padStart(2,'0')}</span><span>${escape(s.title)}</span></button>`).join('');
 $('step-nav').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{if(busy)return;returnReview=false;renderStep(Number(b.dataset.step));scrollHeading();}));
}
function fieldHTML(f){
 const id=f.id, required=f.required?' required':'',desc=f.hint?` aria-describedby="hint-${id}"`:'';
 const hint=f.hint?`<p class="field-hint" id="hint-${id}">${escape(f.hint)}</p>`:'';
 let control='';
 if(f.type==='radio'||f.type==='checkbox'){
  control=`<fieldset class="field" data-field="${id}" ${active(f)?'':'hidden'}><legend>${label(f)}</legend>${hint}<div class="option-grid ${f.type==='radio'?'radio-grid':''}">${f.options.map((o,i)=>`<label class="option"><input type="${f.type}" name="${id}" id="${id}-${i}" value="${escape(o)}"><span>${escape(o)}</span></label>`).join('')}</div><p class="field-error" id="error-${id}" role="alert"></p></fieldset>`;
 }else{
  if(f.type==='textarea')control=`<textarea id="${id}" name="${id}" maxlength="2000" placeholder="${escape(f.placeholder||'')}"${required}${desc}></textarea>`;
  else if(f.type==='select')control=`<select id="${id}" name="${id}"${required}${desc}><option value="">Selecione uma opção</option>${f.options.map(o=>`<option value="${escape(o)}">${escape(o)}</option>`).join('')}</select>`;
  else control=`<input id="${id}" name="${id}" type="${f.type}" maxlength="${f.type==='email'?254:2000}" placeholder="${escape(f.placeholder||'')}" ${f.autocomplete?`autocomplete="${f.autocomplete}"`:''}${required}${desc}>`;
  control=`<div class="field" data-field="${id}" ${active(f)?'':'hidden'}><label for="${id}">${label(f)}</label>${hint}${control}<p class="field-error" id="error-${id}" role="alert"></p></div>`;
 }return control;
}
function renderStep(index){
 state.step=Math.max(0,Math.min(7,index));save();setView('workspace');
 $('review').hidden=true;$('fields').hidden=false;$('required-note').hidden=false;
 const s=schema[state.step];$('step-kicker').textContent='ETAPA '+String(state.step+1).padStart(2,'0');$('step-title').textContent=s.title;$('step-intro').textContent=s.intro;
 $('step-count').textContent=`Etapa ${state.step+1} de 8`;$('progress-bar').style.width=(state.step/8*100)+'%';document.querySelector('.progress-track').setAttribute('aria-valuenow',state.step);
 $('fields').innerHTML=s.fields.map(fieldHTML).join('');
 s.fields.forEach(f=>{
  document.querySelectorAll(`[name="${f.id}"]`).forEach(el=>{
   if(f.type==='radio')el.checked=state.answers[f.id]===el.value;
   else if(f.type==='checkbox')el.checked=(state.answers[f.id]||[]).includes(el.value);
   else el.value=state.answers[f.id]||'';
   el.disabled=!active(f);
   el.addEventListener('input',()=>update(f,el));el.addEventListener('change',()=>update(f,el));
  });
 });
 $('upload-area').hidden=state.step!==4;$('form-error').textContent='';$('next').textContent=returnReview?'Voltar à revisão':state.step===7?'Revisar minhas respostas':'Continuar';$('back').textContent=state.step===0?'Início':'Voltar';renderFiles();nav();
}
function update(f,el){
 if(f.type==='checkbox'){
  const elements=[...document.querySelectorAll(`[name="${f.id}"]`)];
  if(f.exclusive&&el.checked){elements.forEach(e=>{if(el.value===f.exclusive&&e!==el)e.checked=false;else if(el.value!==f.exclusive&&e.value===f.exclusive)e.checked=false;});}
  state.answers[f.id]=elements.filter(e=>e.checked).map(e=>e.value);
 }else if(f.type==='radio'){state.answers[f.id]=el.value;}
 else state.answers[f.id]=el.value;
 schema[state.step].fields.forEach(other=>{
  if(!other.when)return;const on=active(other);document.querySelector(`[data-field="${other.id}"]`).hidden=!on;
  document.querySelectorAll(`[name="${other.id}"]`).forEach(e=>{e.disabled=!on;if(!on){e.value='';state.answers[other.id]='';}});
 });
 const error=$('error-'+f.id);if(error)error.textContent='';el.removeAttribute('aria-invalid');save();
}
function errorFor(f){
 if(!active(f))return '';
 const val=state.answers[f.id]||'';
 if(f.required && (!val.length || (typeof val==='string'&&!val.trim())))return 'Preencha este campo para continuar.';
 if(f.type==='email'&&val&&!/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(val.trim()))return 'Informe um e-mail válido.';
 if(f.type==='url'&&val){try{const u=new URL(val.trim());if(!/^https?:$/.test(u.protocol)||!u.hostname.includes('.'))return 'Informe um link completo, começando com https://.';}catch(e){return 'Informe um link completo, começando com https://.';}}
 if(typeof val==='string'&&val.length>2000)return 'Use até 2.000 caracteres.';
 return '';
}
function validStep(i){return schema[i].fields.filter(f=>errorFor(f));}
function showErrors(i){
 const errors=validStep(i);errors.forEach(f=>{$('error-'+f.id).textContent=errorFor(f);document.querySelectorAll(`[name="${f.id}"]`).forEach(el=>el.setAttribute('aria-invalid','true'));});
 if(errors.length){const el=document.querySelector(`[name="${errors[0].id}"]`);el.focus();el.scrollIntoView({block:'center',behavior:'smooth'});}
 return !errors.length;
}
function renderFiles(){
 $('file-list').innerHTML='';files.forEach((f,i)=>{
  const li=document.createElement('li'),span=document.createElement('span'),btn=document.createElement('button');span.textContent=`${f.name} · ${(f.size/1024/1024).toFixed(2)} MB`;btn.type='button';btn.textContent='Remover';btn.setAttribute('aria-label','Remover '+f.name);btn.addEventListener('click',async()=>{files.splice(i,1);await storeFiles();renderFiles();});li.append(span,btn);$('file-list').append(li);
 });
 if(files.length&&!fileStorageOK)$('file-error').textContent='Seu navegador não conseguiu salvar os anexos. Mantenha a página aberta ou selecione-os novamente ao voltar.';
}
function readFile(f){return new Promise((resolve,reject)=>{const r=new FileReader();r.onerror=()=>reject(Error('Não foi possível ler '+f.name+'.'));r.onload=()=>resolve({name:f.name,type:f.type,size:f.size,content:r.result.split(',')[1]});r.readAsDataURL(f);});}
$('attachments').addEventListener('change',async e=>{
 const selected=[...e.target.files];e.target.value='';$('file-error').textContent='';
 try{
  if(files.length+selected.length>4)throw Error('Selecione no máximo 4 arquivos no total.');
  if(selected.some(f=>!/^.+\.(pdf|jpe?g|png|webp)$/i.test(f.name)))throw Error('Use PDF, JPG, PNG ou WEBP.');
  if(selected.some(f=>!f.size||f.size>5*1024*1024))throw Error('Cada arquivo deve ter até 5 MB e não pode estar vazio.');
  if([...files,...selected].reduce((n,f)=>n+f.size,0)>LIMIT)throw Error('Os anexos juntos podem ter até 10 MB.');
  const result=await Promise.all(selected.map(readFile));files.push(...result);await storeFiles();renderFiles();
 }catch(err){$('file-error').textContent=err.message;}
});
function review(){
 const invalid=schema.findIndex((s,i)=>validStep(i).length);if(invalid!==-1){renderStep(invalid);showErrors(invalid);return;}
 state.step=8;save();setView('workspace');$('fields').hidden=true;$('review').hidden=false;$('upload-area').hidden=true;$('required-note').hidden=true;
 $('step-kicker').textContent='ANTES DE ENVIAR';$('step-title').textContent='Sua história, em detalhes.';$('step-intro').textContent='Confira as respostas e os anexos. Você pode editar qualquer etapa.';$('step-count').textContent='Revisão do diagnóstico';$('progress-bar').style.width='100%';document.querySelector('.progress-track').setAttribute('aria-valuenow',8);
 const area=$('review');area.innerHTML='';
 schema.forEach((s,i)=>{
  const section=document.createElement('section');section.className='review-section';const title=document.createElement('h2'),edit=document.createElement('button');title.textContent=s.title;edit.type='button';edit.className='small-link';edit.textContent='Editar';edit.setAttribute('aria-label','Editar '+s.title);edit.onclick=()=>{returnReview=true;renderStep(i);scrollHeading();};title.append(edit);section.append(title);const dl=document.createElement('dl');
  s.fields.filter(active).forEach(f=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=f.label;const v=state.answers[f.id];dd.textContent=(Array.isArray(v)?v.join(', '):v)||'Não informado';dl.append(dt,dd);});section.append(dl);area.append(section);
 });
 const fileSection=document.createElement('section');fileSection.className='review-section';fileSection.innerHTML='<h2>Anexos</h2>';const names=document.createElement('p');names.textContent=files.length?files.map(f=>f.name).join(' · '):'Nenhum anexo';fileSection.append(names);area.append(fileSection);
 const consent=document.createElement('label');consent.className='consent';const check=document.createElement('input');check.type='checkbox';check.id='consent';check.checked=state.consent;check.onchange=()=>{state.consent=check.checked;save();};const text=document.createElement('span');text.textContent='Confirmo o envio das respostas e dos anexos à Thais Azevedo e de uma cópia para o e-mail que informei.';consent.append(check,text);area.append(consent);
 $('next').textContent='Enviar diagnóstico';$('back').textContent='Voltar';$('form-error').textContent='';nav();scrollHeading();
}
function compile(){
 let text='DIAGNÓSTICO DIGITAL | THAIS AZEVEDO\nMarketing, conteúdo e posicionamento digital\n';
 schema.forEach((s,i)=>{text+='\n'+(i+1)+'. '+s.title.toUpperCase()+'\n';s.fields.filter(active).forEach(f=>{const a=state.answers[f.id];text+=f.label+':\n'+((Array.isArray(a)?a.join(', '):a)||'Não informado')+'\n\n';});});
 return text+'\nAnexos: '+(files.map(f=>f.name).join(', ')||'Nenhum')+'\nContato: azevedothayss@gmail.com\nWhatsApp: https://wa.me/5531992836383\n';
}
function download(){const blob=new Blob([compile()],{type:'text/plain;charset=utf-8'}),link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='meu-diagnostico-digital.txt';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);}
async function send(){
 if(busy)return;if(!state.consent){$('form-error').textContent='Confirme o envio das respostas e dos anexos.';$('consent').focus();return;}
 if(runtime.mode!=='gas'||!window.google||!google.script||!google.script.run){$('form-error').textContent='O envio ainda não está disponível. Seu rascunho foi mantido. Você pode baixar as respostas ou falar com Thais pelo WhatsApp.';$('form-error').focus();return;}
 busy=true;$('next').disabled=true;$('back').disabled=true;$('next').textContent='Enviando…';$('form-error').textContent='';
 const payload={id:state.id,token:runtime.token,answers:state.answers,files:files.map(({name,type,content})=>({name,type,content})),consent:true,website:$('website').value};compiled=compile();
 let timer=setTimeout(()=>{if(busy){$('form-error').textContent='O envio está demorando. Aguarde a confirmação; seu rascunho foi mantido.';}},30000);
 const finish=()=>{clearTimeout(timer);busy=false;$('next').disabled=false;$('back').disabled=false;$('next').textContent='Enviar diagnóstico';};
 google.script.run.withSuccessHandler(async result=>{
  finish();if(!result||result.ok!==true){$('form-error').textContent=result&&result.message||'Não foi possível confirmar o envio. Seu rascunho foi mantido.';$('form-error').focus();return;}
  const receipt=result.receipt;await clearAll();try{sessionStorage.setItem(KEY+'-receipt',receipt);}catch(e){}
  $('receipt').textContent='Protocolo: '+receipt;setView('success');$('success-title').focus({preventScroll:true});$('success').scrollIntoView({block:'start',behavior:'smooth'});
 }).withFailureHandler(()=>{finish();$('form-error').textContent='Não conseguimos confirmar o envio. Seu rascunho foi mantido. Verifique sua conexão e tente novamente. Se a dúvida continuar, fale com Thais.';$('form-error').focus();}).submitBriefing(payload);
}
$('briefing').addEventListener('submit',e=>{e.preventDefault();if(busy)return;if(state.step===8){send();return;}if(!showErrors(state.step))return;if(returnReview||state.step===7){returnReview=false;review();}else{renderStep(state.step+1);scrollHeading();}});
$('back').onclick=()=>{if(busy)return;if(state.step===0){setView('welcome');$('start').focus();}else{renderStep(state.step===8?7:state.step-1);scrollHeading();}};
$('start').onclick=()=>{renderStep(0);scrollHeading();};$('resume').onclick=()=>{state.step===8?review():renderStep(state.step);scrollHeading();};
$('brand-home').onclick=e=>{e.preventDefault();if(!busy){setView('welcome');updateResume();}};
$('clear-draft').onclick=async()=>{if(busy)return;if(confirm('Apagar as respostas e os anexos salvos neste navegador?')){await clearAll();renderStep(0);scrollHeading();}};
$('new-briefing').onclick=async()=>{await clearAll();try{sessionStorage.removeItem(KEY+'-receipt');}catch(e){}setView('welcome');updateResume();$('start').focus();};
$('download').onclick=download;window.addEventListener('beforeunload',e=>{save();if(busy){e.preventDefault();e.returnValue='';}});
function updateResume(){const has=Object.values(state.answers).some(x=>x&&x.length)||files.length;$('resume').hidden=!has;$('start').textContent=has?'Rever desde o início':'Começar meu diagnóstico';}
async function init(){
 try{const raw=localStorage.getItem(KEY),saved=raw&&JSON.parse(raw);if(saved&&saved.version===1&&saved.answers&&typeof saved.answers==='object'&&/^[a-zA-Z0-9_-]{16,80}$/.test(saved.id)){state={...state,...saved,step:Math.max(0,Math.min(8,Number(saved.step)||0))};}}catch(e){storageOK=false;}
 db=await openDB();fileStorageOK=!!db;files=await loadFiles();save();updateResume();
 try{const receipt=sessionStorage.getItem(KEY+'-receipt');if(receipt&&!Object.keys(state.answers).length){$('receipt').textContent='Protocolo: '+receipt;setView('success');}}catch(e){}
}
init();
})();
