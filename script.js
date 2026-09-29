/* =========================================
   GRACE IA
   Sistema de atendimento
========================================= */


/* =========================================
   ELEMENTOS DA PÁGINA
========================================= */

const form =
    document.getElementById("messageForm");

const input =
    document.getElementById("messageInput");

const messages =
    document.getElementById("messages");

const typing =
    document.getElementById("typing");

const quickButtons =
    document.querySelectorAll(".quick-button");


/* =========================================
   ENVIO DA MENSAGEM
========================================= */

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const message =
        input.value.trim();

    if (!message) {
        return;
    }

    sendMessage(message);

    input.value = "";

    input.focus();

});


/* =========================================
   BOTÕES RÁPIDOS
========================================= */

quickButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const message =
            button.dataset.message;

        if (!message) {
            return;
        }

        sendMessage(message);

    });

});


/* =========================================
   ENVIAR MENSAGEM
========================================= */

function sendMessage(message) {

    if (!message) {
        return;
    }

    /* Mostra mensagem do usuário */

    addUserMessage(message);


    /* Mostra Grace digitando */

    showTyping();


    /* Simula tempo de resposta */

    setTimeout(function () {

        hideTyping();

        const response =
            getGraceResponse(message);

        addGraceMessage(response);

    }, 700);

}


/* =========================================
   MENSAGEM DO USUÁRIO
========================================= */

function addUserMessage(message) {

    const container =
        document.createElement("div");

    container.className =
        "message user";


    const bubble =
        document.createElement("div");

    bubble.className =
        "message-bubble";


    /* Segurança contra HTML */

    bubble.textContent =
        message;


    const time =
        document.createElement("span");

    time.className =
        "message-time";

    time.textContent =
        getTime();


    bubble.appendChild(time);

    container.appendChild(bubble);

    messages.appendChild(container);


    scrollChat();

}


/* =========================================
   MENSAGEM DA GRACE
========================================= */

function addGraceMessage(message) {

    const container =
        document.createElement("div");

    container.className =
        "message grace";


    const bubble =
        document.createElement("div");

    bubble.className =
        "message-bubble";


    bubble.innerHTML =
        message;


    const time =
        document.createElement("span");

    time.className =
        "message-time";

    time.textContent =
        getTime();


    bubble.appendChild(time);

    container.appendChild(bubble);

    messages.appendChild(container);


    scrollChat();

}


/* =========================================
   RESPOSTAS DA GRACE
========================================= */

function getGraceResponse(message) {

    const text =
        normalizeText(message);


    /* -------------------------
       SAUDAÇÃO
    ------------------------- */

    if (
        text.includes("oi") ||
        text.includes("ola") ||
        text.includes("bom dia") ||
        text.includes("boa tarde") ||
        text.includes("boa noite")
    ) {

        return `
            <strong>Olá! 😊</strong>

            <p>
                É um prazer falar com você!
                Eu sou a Grace.
                Como posso ajudar?
            </p>
        `;

    }


    /* -------------------------
       HORÁRIOS
    ------------------------- */

    if (
        text.includes("horario") ||
        text.includes("funciona") ||
        text.includes("abre") ||
        text.includes("fecha") ||
        text.includes("atendimento")
    ) {

        return `
            <strong>Horários 🕐</strong>

            <p>
                Nosso atendimento funciona
                de segunda a sexta,
                das 8h às 18h.
            </p>

            <p>
                Se precisar, posso ajudar
                com outras informações.
            </p>
        `;

    }


    /* -------------------------
       SERVIÇOS
    ------------------------- */

    if (
        text.includes("servico") ||
        text.includes("servicos")
    ) {

        return `
            <strong>Serviços ✨</strong>

            <p>
                Posso apresentar nossos
                serviços e ajudar você
                a encontrar o que procura.
            </p>
        `;

    }


    /* -------------------------
       PRODUTOS
    ------------------------- */

    if (
        text.includes("produto") ||
        text.includes("produtos")
    ) {

        return `
            <strong>Produtos 🛍️</strong>

            <p>
                Posso ajudar você a conhecer
                nossos produtos.
            </p>
        `;

    }


    /* -------------------------
       PREÇOS
    ------------------------- */

    if (
        text.includes("preco") ||
        text.includes("precos") ||
        text.includes("valor") ||
        text.includes("quanto custa")
    ) {

        return `
            <strong>Preços 💰</strong>

            <p>
                Posso ajudar você a consultar
                os preços dos nossos produtos
                e serviços.
            </p>
        `;

    }


    /* -------------------------
       PAGAMENTO
    ------------------------- */

    if (
        text.includes("pagamento") ||
        text.includes("pix") ||
        text.includes("cartao") ||
        text.includes("pagar") ||
        text.includes("dinheiro")
    ) {

        return `
            <strong>Formas de pagamento 💳</strong>

            <p>
                Podemos trabalhar com Pix,
                cartão e outras formas
                de pagamento.
            </p>
        `;

    }


    /* -------------------------
       ATENDENTE
    ------------------------- */

    if (
        text.includes("atendente") ||
        text.includes("humano") ||
        text.includes("pessoa") ||
        text.includes("atendimento humano")
    ) {

        return `
            <strong>Atendimento humano 👤</strong>

            <p>
                Claro! Posso encaminhar
                você para um atendente.
            </p>
        `;

    }


    /* -------------------------
       AGENDAMENTO
    ------------------------- */

    if (
        text.includes("agendar") ||
        text.includes("agendamento") ||
        text.includes("marcar horario") ||
        text.includes("marcar")
    ) {

        return `
            <strong>Agendamento 📅</strong>

            <p>
                Posso ajudar você com
                informações sobre agendamento.
            </p>

            <p>
                Em breve essa função estará
                conectada à agenda da empresa.
            </p>
        `;

    }


    /* -------------------------
       AGRADECIMENTO
    ------------------------- */

    if (
        text.includes("obrigado") ||
        text.includes("obrigada") ||
        text.includes("valeu")
    ) {

        return `
            <strong>Por nada! 💜</strong>

            <p>
                Sempre que precisar,
                pode falar comigo.
            </p>
        `;

    }


    /* -------------------------
       DESPEDIDA
    ------------------------- */

    if (
        text.includes("tchau") ||
        text.includes("ate mais") ||
        text.includes("até mais")
    ) {

        return `
            <strong>Até mais! 👋</strong>

            <p>
                Foi um prazer ajudar você.
                Quando precisar, estarei por aqui.
            </p>
        `;

    }


    /* -------------------------
       RESPOSTA PADRÃO
    ------------------------- */

    return `
        <strong>Entendi 😊</strong>

        <p>
            Ainda estou aprendendo,
            mas posso ajudar com:
        </p>

        <p>
            🕐 Horários<br>
            ✨ Serviços<br>
            🛍️ Produtos<br>
            💳 Pagamentos<br>
            📅 Agendamentos<br>
            👤 Atendimento humano
        </p>
    `;

}


/* =========================================
   NORMALIZAR TEXTO
========================================= */

function normalizeText(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


/* =========================================
   GRACE DIGITANDO
========================================= */

function showTyping() {

    typing.style.display =
        "flex";

}


function hideTyping() {

    typing.style.display =
        "none";

}


/* =========================================
   ROLAR CHAT
========================================= */

function scrollChat() {

    const chat =
        document.getElementById("chat");

    chat.scrollTop =
        chat.scrollHeight;

}


/* =========================================
   HORÁRIO DA MENSAGEM
========================================= */

function getTime() {

    const now =
        new Date();

    return now.toLocaleTimeString(
        "pt-BR",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}
