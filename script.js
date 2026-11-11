const cenarios = [
    {
        nome: "Suporte Caixa",
        numero: "+55 11 9999-9999",
        dia: "HOJE",
        horario: "14:30",
        conteudo: "Identificamos um acesso suspeito na sua conta. Clique no link para verificar: http://caixa-seguranca-br.com/login",
        eGolpe: true,
        explicacao: "Bancos não enviam links por WhatsApp para verificação de conta. O domínio também não é oficial."
    },
    {
        nome: "Mãe",
        numero: "+55 83 98888-7777",
        dia: "HOJE",
        horario: "15:45",
        conteudo: "Oi filho, meu celular caiu e quebrou, anota meu número novo! Manda um pix de R$ 350 pra eu pagar o conserto do antigo? A chave é esse número.",
        eGolpe: true,
        explicacao: "Golpe do perfil falso. Eles usam fotos de redes sociais e pedem dinheiro. Sempre ligue para o número antigo para confirmar."
    },
    {
        nome: "Clínica Sorriso",
        numero: "+55 83 3222-1111",
        dia: "ONTEM",
        horario: "09:15",
        conteudo: "Olá! Confirmando sua consulta amanhã às 14h com o Dr. Marcos. Responda SIM para confirmar ou NÃO para cancelar.",
        eGolpe: false,
        explicacao: "Mensagem padrão de confirmação. Não há links suspeitos ou pedidos de pagamento antecipado."
    },
    {
        nome: "RH Amazon",
        numero: "+55 11 9777-6666",
        dia: "HOJE",
        horario: "10:10",
        conteudo: "Você foi selecionado para trabalhar meio período ganhando de R$ 500 a R$ 2000 por dia. Clique no link para falar com a recrutadora e ganhe R$ 50 de bônus.",
        eGolpe: true,
        explicacao: "Golpe da Tarefa. Nenhuma empresa recruta oferecendo dinheiro fácil assim via WhatsApp."
    },
    {
        nome: "Correios",
        numero: "+55 11 9555-4444",
        dia: "HOJE",
        horario: "11:20",
        conteudo: "Sua encomenda foi retida na alfândega. Pague a taxa de despacho postal de R$ 15,30 para liberar a entrega: link-correios-taxa.net",
        eGolpe: true,
        explicacao: "Os Correios não cobram taxas por links diretos no WhatsApp. O pagamento deve ser feito no site oficial."
    }
];

let rodadaAtual = 0;
let pontuacao = 0;

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function iniciarJogo() {
    document.getElementById("tela-inicial").classList.add("hidden");
    rodadaAtual = 0;
    pontuacao = 0;
    embaralhar(cenarios);
    carregarRodada(rodadaAtual);
}

function carregarRodada(index) {
    const dados = cenarios[index];
    document.getElementById("var-nome").innerText = dados.nome;
    document.getElementById("var-numero").innerText = dados.numero;
    document.getElementById("var-dia").innerText = dados.dia;
    document.getElementById("var-horario").innerText = dados.horario;
    document.getElementById("var-conteudo").innerText = dados.conteudo;
    document.getElementById("contador-rodada").innerText = `${index + 1}/${cenarios.length}`;
}

function verificarResposta(jogadorAchaQueEGolpe) {
    const dados = cenarios[rodadaAtual];
    const acertou = (jogadorAchaQueEGolpe === dados.eGolpe);
    const modal = document.getElementById("modal-feedback");
    const icone = document.getElementById("modal-icone");
    const titulo = document.getElementById("modal-titulo");
    const explicacao = document.getElementById("modal-explicacao");

    if (acertou) {
        pontuacao++;
        icone.innerText = "✅";
        titulo.innerText = "Você Acertou!";
        titulo.style.color = "#22c55e";
    } else {
        icone.innerText = "❌";
        titulo.innerText = "Você Errou!";
        titulo.style.color = "#ef4444";
    }

    explicacao.innerText = dados.explicacao;
    modal.classList.remove("hidden");
}

function proximaRodada() {
    const modal = document.getElementById("modal-feedback");
    modal.classList.add("hidden");
    rodadaAtual++;
    
    if (rodadaAtual < cenarios.length) {
        carregarRodada(rodadaAtual);
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    document.getElementById("tela-final").classList.remove("hidden");
    document.getElementById("pontuacao-final").innerText = pontuacao;
    document.getElementById("total-final").innerText = cenarios.length;
    
    const titulo = document.getElementById("resultado-titulo");
    const texto = document.getElementById("resultado-texto");
    const icone = document.getElementById("resultado-icone");
    const aproveitamento = pontuacao / cenarios.length;
    
    if (aproveitamento === 1) {
        titulo.innerText = "Detetive Impecável!";
        titulo.style.color = "#008069";
        texto.innerText = "Parabéns! Você tem um olhar treinado e está blindado contra as principais ameaças digitais.";
        icone.style.backgroundColor = "#008069";
    } else if (aproveitamento >= 0.6) {
        titulo.innerText = "Cidadão Atento!";
        titulo.style.color = "#eab308";
        texto.innerText = "Você evitou a maioria dos golpes, mas ainda precisa redobrar a atenção com mensagens urgentes.";
        icone.style.backgroundColor = "#eab308";
    } else {
        titulo.innerText = "Alvo Fácil!";
        titulo.style.color = "#ef4444";
        texto.innerText = "Cuidado! Desconfie sempre de links desconhecidos e pedidos financeiros urgentes.";
        icone.style.backgroundColor = "#ef4444";
    }
}

function reiniciarJogo() {
    document.getElementById("tela-final").classList.add("hidden");
    iniciarJogo();
}