window.DIAGNOSTICO_SCHEMA=[
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
