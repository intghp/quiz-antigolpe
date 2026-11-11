const cenarios = [
    {
        nome: "Suporte Caixa",
        numero: "+55 11 9999-9999",
        fotoUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        dia: "HOJE",
        horario: "14:30",
        conteudo: "Identificamos um acesso suspeito na sua conta. Clique no link para verificar: http://caixa-seguranca-br.com/login",
        eGolpe: true,
        explicacao: "Bancos não enviam links por WhatsApp para verificação de conta. O domínio também não é oficial."
    },
    {
        nome: "Mãe",
        numero: "+55 83 98888-7777",
        fotoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60",
        dia: "HOJE",
        horario: "15:45",
        conteudo: "Oi filho, meu celular caiu e quebrou, anota meu número novo! Manda um pix de R$ 350 pra eu pagar o conserto do antigo? A chave é esse número.",
        eGolpe: true,
        explicacao: "Golpe do perfil falso. Eles usam fotos de redes sociais e pedem dinheiro. Sempre ligue para o número antigo para confirmar."
    },
    {
        nome: "Clínica Sorriso",
        numero: "+55 83 3222-1111",
        fotoUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=100&auto=format&fit=crop&q=60",
        dia: "ONTEM",
        horario: "09:15",
        conteudo: "Olá! Confirmando sua consulta amanhã às 14h com o Dr. Marcos. Responda SIM para confirmar ou NÃO para cancelar.",
        eGolpe: false,
        explicacao: "Mensagem padrão de confirmação. Não há links suspeitos ou pedidos de pagamento antecipado."
    }
];

let rodadaAtual = 0;
let pontuacao = 0;

function carregarRodada(index) {
    const dados = cenarios[index];
    document.getElementById("var-nome").innerText = dados.nome;
    document.getElementById("var-numero").innerText = dados.numero;
    document.getElementById("var-foto").src = dados.fotoUrl;
    document.getElementById("var-dia").innerText = dados.dia;
    document.getElementById("var-horario").innerText = dados.horario;
    document.getElementById("var-conteudo").innerText = dados.conteudo;
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
        alert(`FIM DE JOGO! Você acertou ${pontuacao} de ${cenarios.length}.`);
        rodadaAtual = 0;
        pontuacao = 0;
        carregarRodada(rodadaAtual);
    }
}

carregarRodada(rodadaAtual);