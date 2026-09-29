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



/* =========================
   ENVIO DO FORMULÁRIO
========================= */

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const message =
            input.value.trim();

        if (!message) {
            return;
        }

        sendMessage(message);

        input.value = "";

        input.focus();
    }
);



/* =========================
   BOTÕES RÁPIDOS
========================= */

quickButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const message =
                    button.dataset.message;

                sendMessage(message);

            }
        );

    }
);



/* =========================
   ENVIAR MENSAGEM
========================= */

function sendMessage(message) {

    addUserMessage(message);

    showTyping();

    setTimeout(
        function () {

            hideTyping();

            const response =
                getGraceResponse(message);

            addGraceMessage(response);

        },
        700
    );

}



/* =========================
   MENSAGEM DO USUÁRIO
========================= */

function addUserMessage(message) {

    const container =
        document.createElement("div");

    container.className =
        "message user";


    const bubble =
        document.createElement("div");

    bubble.className =
        "message-bubble";


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



/* =========================
   MENSAGEM DA GRACE
========================= */

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



/* =========================
   RESPOSTAS TEMPORÁRIAS
========================= */

function getGraceResponse(message) {

    const text =
        message
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");



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
                Como posso ajudar?
            </p>
        `;
    }



    if (
        text.includes("horario") ||
        text.includes("funciona") ||
        text.includes("abre") ||
        text.includes("fecha")
    ) {

        return `
            <strong>Horários 🕐</strong>

            <p>
                Nosso atendimento funciona
                de segunda a sexta,
                das 8h às 18h.
            </p>
        `;
    }



    if (
        text.includes("servico") ||
        text.includes("produto") ||
        text.includes("preco") ||
        text.includes("valor")
    ) {

        return `
            <strong>Serviços e produtos ✨</strong>

            <p>
                Posso ajudar você a conhecer
                nossos serviços e produtos.
            </p>
        `;
    }



    if (
        text.includes("pagamento") ||
        text.includes("pix") ||
        text.includes("cartao") ||
        text.includes("pagar")
    ) {

        return `
            <strong>Formas de pagamento 💳</strong>

            <p>
                Podemos trabalhar com Pix,
                cartão e outras formas de pagamento.
            </p>
        `;
    }



    if (
        text.includes("atendente") ||
        text.includes("humano") ||
        text.includes("pessoa")
    ) {

        return `
            <strong>Atendimento humano 👤</strong>

            <p>
                Claro! Seu atendimento pode
                ser encaminhado para uma pessoa.
            </p>
        `;
    }



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



    return `
        <strong>Entendi 😊</strong>

        <p>
            Ainda estou aprendendo.
            Você pode perguntar sobre
            horários, serviços, pagamentos
            ou solicitar um atendente.
        </p>
    `;
}



/* =========================
   DIGITANDO
========================= */

function showTyping() {

    typing.style.display =
        "flex";
}


function hideTyping() {

    typing.style.display =
        "none";
}



/* =========================
   ROLAR CHAT
========================= */

function scrollChat() {

    const chat =
        document.getElementById("chat");

    chat.scrollTop =
        chat.scrollHeight;
}



/* =========================
   HORÁRIO
========================= */

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


document.querySelectorAll(".quick-actions button").forEach(button => {
  button.addEventListener("click", () => sendMessage(button.dataset.question));
});
