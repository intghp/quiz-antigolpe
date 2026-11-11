let rodadaAtual = 0;
let pontuacao = 0;
let perguntasDaPartida = [];

function iniciarJogo() {
    document.getElementById("tela-inicial").classList.add("hidden");
    rodadaAtual = 0;
    pontuacao = 0;
    
    let cenariosEmbaralhados = [...cenarios];
    for (let i = cenariosEmbaralhados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cenariosEmbaralhados[i], cenariosEmbaralhados[j]] = [cenariosEmbaralhados[j], cenariosEmbaralhados[i]];
    }
    
    perguntasDaPartida = cenariosEmbaralhados.slice(0, 7);
    
    carregarRodada(rodadaAtual);
}

function carregarRodada(index) {
    const dados = perguntasDaPartida[index];
    document.getElementById("var-nome").innerText = dados.nome;
    document.getElementById("var-numero").innerText = dados.numero;
    document.getElementById("var-dia").innerText = dados.dia;
    document.getElementById("var-horario").innerText = dados.horario;
    document.getElementById("var-conteudo").innerText = dados.conteudo;
    document.getElementById("contador-rodada").innerText = `${index + 1}/${perguntasDaPartida.length}`;
}

function verificarResposta(jogadorAchaQueEGolpe) {
    const dados = perguntasDaPartida[rodadaAtual];
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

    explicacao.innerHTML = dados.explicacao;
    modal.classList.remove("hidden");
}

function proximaRodada() {
    const modal = document.getElementById("modal-feedback");
    modal.classList.add("hidden");
    rodadaAtual++;
    
    if (rodadaAtual < perguntasDaPartida.length) {
        carregarRodada(rodadaAtual);
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    document.getElementById("tela-final").classList.remove("hidden");
    document.getElementById("pontuacao-final").innerText = pontuacao;
    document.getElementById("total-final").innerText = perguntasDaPartida.length;
    
    const titulo = document.getElementById("resultado-titulo");
    const texto = document.getElementById("resultado-texto");
    const icone = document.getElementById("resultado-icone");
    const aproveitamento = pontuacao / perguntasDaPartida.length;
    
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

    const listaRef = document.getElementById("lista-referencias");
    listaRef.innerHTML = "";
    
    const linksUnicos = [];
    perguntasDaPartida.forEach(pergunta => {
        const refExistente = linksUnicos.find(link => link.url === pergunta.referenciaLink);
        if (!refExistente && pergunta.referenciaLink) {
            linksUnicos.push({ titulo: pergunta.referenciaTitulo, url: pergunta.referenciaLink });
        }
    });

    linksUnicos.forEach(ref => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${ref.url}" target="_blank" style="text-decoration: none; color: #008069; display: flex; align-items: flex-start; gap: 6px;"><i class="fa-solid fa-arrow-up-right-from-square" style="margin-top: 3px; font-size: 11px;"></i> <span>${ref.titulo}</span></a>`;
        listaRef.appendChild(li);
    });
}

function reiniciarJogo() {
    document.getElementById("tela-final").classList.add("hidden");
    iniciarJogo();
}