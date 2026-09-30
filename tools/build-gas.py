from pathlib import Path
import re,base64,json
root=Path(__file__).resolve().parents[1]
schema=(root/'data/schema.json').read_text().strip()
(root/'schema.js').write_text('window.DIAGNOSTICO_SCHEMA='+schema+';\n')
code=(root/'google-apps-script/Code.gs').read_text()
a=code.index('const ETAPAS =');b=code.index('\nconst LIMITE_ANEXOS',a)
code=code[:a]+'const ETAPAS = '+schema+';'+code[b:]
(root/'google-apps-script/Code.gs').write_text(code)
html=(root/'index.html').read_text()
html=html.replace('<link rel="stylesheet" href="styles.css">','<style>\n'+(root/'styles.css').read_text()+'\n</style>')
html=html.replace("<script>window.DIAGNOSTICO_RUNTIME={mode:'preview'};</script>",'<script>window.DIAGNOSTICO_RUNTIME=<?!= runtime ?>;</script>')
html=html.replace('<script src="config.js"></script><script src="schema.js"></script><script src="app.js" defer></script>','<script>window.DIAGNOSTICO_CONFIG={};\n'+(root/'schema.js').read_text()+'</script>')
html=html.replace('</body>', '<script>\n'+(root/'app.js').read_text()+'\n</script>\n</body>')
for p in (root/'assets').glob('*.png'):
 html=html.replace('assets/'+p.name,'data:image/png;base64,'+base64.b64encode(p.read_bytes()).decode())
for p in (root/'assets/fonts').glob('*.woff'):
 html=html.replace('assets/fonts/'+p.name,'data:font/woff;base64,'+base64.b64encode(p.read_bytes()).decode())
(root/'google-apps-script/Index.html').write_text(html)
print('Apps Script: interface autocontida, sem dependência de caminhos do GitHub.')
