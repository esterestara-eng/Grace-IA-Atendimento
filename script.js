const chat = document.getElementById("chat");
const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");


/* =====================================
   MOSTRAR MENSAGEM
===================================== */

function addMessage(text, type) {

    const box = document.createElement("div");

    box.className = `message ${type}`;


    const name = document.createElement("strong");

    name.textContent =
        type === "grace"
            ? "Grace"
            : "Você";


    const p = document.createElement("p");

    if (type === "grace") {
    const parsed = new DOMParser().parseFromString(text, "text/html");
    p.textContent = parsed.body.textContent.trim();
} else {
    p.textContent = text;
}


    box.appendChild(name);

    box.appendChild(p);

    chat.appendChild(box);

    chat.scrollTop =
        chat.scrollHeight;

}


/* =====================================
   ENVIAR MENSAGEM PARA O BACKEND
===================================== */

async function sendMessage(text) {

    if (!text.trim()) return;


    const cleanText =
        text.trim();


    /* -----------------------------
       MOSTRAR MENSAGEM DO USUÁRIO
    ----------------------------- */

    addMessage(
        cleanText,
        "user"
    );


    /* -----------------------------
       LIMPAR CAMPO
    ----------------------------- */

    input.value = "";


    try {

        const response =
            await fetch(
                "http://localhost:3000/api/chat",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        message:
                            cleanText

                    })

                }
            );


        const data =
            await response.json();


        /* -----------------------------
           VERIFICAR RESPOSTA
        ----------------------------- */

        if (!response.ok || !data.success) {

            throw new Error(
                data.error ||
                "Erro ao conversar com a Grace."
            );

        }


        /* -----------------------------
           MOSTRAR RESPOSTA
        ----------------------------- */

        addMessage(
            data.response,
            "grace"
        );

    }

    catch (error) {

        console.error(
            "Erro ao enviar mensagem:",
            error
        );


        addMessage(
            "Desculpe, não consegui me conectar ao servidor da Grace. Verifique se o servidor está funcionando.",
            "grace"
        );

    }

}


/* =====================================
   FORMULÁRIO
===================================== */

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const text =
            input.value;


        sendMessage(text);

    }
);


/* =====================================
   BOTÕES DE AÇÃO RÁPIDA
===================================== */

document
    .querySelectorAll(
        ".quick-actions button"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                sendMessage(
                    button.dataset.question
                );

            }
        );

    });
