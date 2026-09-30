const fs=require('fs'),vm=require('vm'),assert=require('assert'),crypto=require('crypto');
const store=new Map();let sent=[],quota=100;
const props={getProperty:k=>store.get(k)||null,setProperty:(k,v)=>store.set(k,v),setProperties:o=>Object.entries(o).forEach(([k,v])=>store.set(k,v)),getProperties:()=>Object.fromEntries(store),deleteProperty:k=>store.delete(k)};
function blob(data,mime='text/plain',name=''){const b=Buffer.isBuffer(data)?data:Array.isArray(data)?Buffer.from(data.map(x=>(x+256)%256)):Buffer.from(String(data));return {getName:()=>name,getBytes:()=>[...b],_data:b,_mime:mime};}
const ctx={console,Date,Error,JSON,Array,String,Number,RegExp,Set,Math,MailApp:{getRemainingDailyQuota:()=>quota,sendEmail:m=>sent.push(m)},PropertiesService:{getScriptProperties:()=>props},LockService:{getScriptLock:()=>({waitLock(){},releaseLock(){}})},Utilities:{DigestAlgorithm:{SHA_256:1},getUuid:()=>crypto.randomUUID(),computeDigest:(_,s)=>crypto.createHash('sha256').update(s).digest(),computeHmacSha256Signature:(s,key)=>crypto.createHmac('sha256',key).update(s).digest(),base64EncodeWebSafe:b=>Buffer.from(b).toString('base64url'),base64Decode:s=>[...Buffer.from(s,'base64')],newBlob:blob,formatDate:(_,__,f)=>f==='yyyyMMdd'?'20260930':'30/09/2026 00:00'}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync(__dirname+'/../google-apps-script/Code.gs','utf8'),ctx);
function token(){const body=(Date.now()-10000)+'.'+crypto.randomUUID();return body+'.'+crypto.createHmac('sha256','secret').update(body).digest('base64url');}
store.set('TOKEN_SECRET','secret');
const valid={q1:'Maria <b>Silva</b>',q3:'Outro',q3outro:'Consultoria',q4:'Serviços',q19:'Negócios locais',q26:'Nova fase',q27:['Atrair novos clientes'],q35:'cliente@example.com',q15:'Não'};
const payload={id:crypto.randomUUID(),token:token(),answers:valid,files:[{name:'logo.png',type:'image/png',content:Buffer.from([137,80,78,71,13,10,26,10,0]).toString('base64')}],consent:true,website:''};
let r=ctx.submitBriefing(payload);assert.equal(r.ok,true,r.message);assert.equal(sent.length,1);assert.equal(sent[0].to,'azevedothayss@gmail.com');assert.equal(sent[0].cc,'cliente@example.com');assert.equal(sent[0].attachments.length,2);assert(sent[0].htmlBody.includes('&lt;b&gt;'));assert(!sent[0].htmlBody.includes('<b>Silva'));
assert.equal(ctx.submitBriefing(payload).receipt,r.receipt);assert.equal(sent.length,1,'retry should not send again');
const clone=o=>JSON.parse(JSON.stringify(o));
function failure(changes){const p={...clone(payload),id:crypto.randomUUID(),token:token(),...changes};const result=ctx.submitBriefing(p);assert.equal(result.ok,false,JSON.stringify(result));return result;}
failure({consent:false});failure({website:'spam'});failure({token:'invalid'});failure({answers:{...valid,q35:'x@x.com,evil@x.com'}});failure({answers:{...valid,q27:[]}});failure({answers:{...valid,q3outro:''}});failure({answers:{...valid,q15:'Sim',q15site:''}});failure({answers:{...valid,q12:['Nenhuma','Instagram']}});failure({files:[{name:'x.png',content:Buffer.from('executable').toString('base64')}]});failure({files:Array(5).fill(payload.files[0])});
quota=1;failure({answers:{...valid,q35:'other@example.com'}});quota=100;
const p2={...clone(payload),id:crypto.randomUUID(),token:token(),answers:{...valid,q35:'second@example.com'}};
ctx.MailApp.sendEmail=()=>{throw Error('network');};assert.equal(ctx.submitBriefing(p2).ok,false);ctx.MailApp.sendEmail=m=>sent.push(m);assert.equal(ctx.submitBriefing(p2).ok,false,'uncertain outcome must not duplicate send');assert.equal(sent.length,1);
console.log('Backend: 17 verificações passaram (validação, anexos, destinatários, HTML, quota e duplicidade).');
