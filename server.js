/*
=========================================
GRACE IA - BACKEND
=========================================

Este servidor será responsável por:

1. Receber mensagens do site
2. Validar os dados
3. Processar a solicitação
4. Futuramente consultar a IA
5. Devolver a resposta para o navegador

IMPORTANTE:
Chaves de API NUNCA devem ficar no
index.html ou script.js.
*/


/* =====================================
   IMPORTAÇÕES
===================================== */

const express = require("express");

const cors = require("cors");


/* =====================================
   CONFIGURAÇÃO
===================================== */

const app = express();

const PORT =
    process.env.PORT || 3000;


/* =====================================
   MIDDLEWARES
===================================== */

app.use(cors());

app.use(express.json());


/* =====================================
   ROTA PRINCIPAL
===================================== */

app.get("/", function (req, res) {

    res.json({

        success: true,

        message:
            "Servidor da Grace IA funcionando.",

        version:
            "1.0.0"

    });

});


/* =====================================
   ROTA DE TESTE
===================================== */

app.get("/api/status", function (req, res) {

    res.json({

        online: true,

        assistant: "Grace IA",

        message:
            "A Grace está online."

    });

});


/* =====================================
   CHAT
===================================== */

app.post("/api/chat", function (req, res) {

    try {

        const message =
            req.body.message;


        /* -----------------------------
           VALIDAR MENSAGEM
        ----------------------------- */

        if (
            typeof message !== "string" ||
            !message.trim()
        ) {

            return res.status(400).json({

                success: false,

                error:
                    "Mensagem inválida."

            });

        }


        const cleanMessage =
            message.trim();


        /* -----------------------------
           RESPOSTA TEMPORÁRIA
        ----------------------------- */

        const response =
            getGraceResponse(cleanMessage);


        /* -----------------------------
           DEVOLVER RESPOSTA
        ----------------------------- */

        return res.json({

            success: true,

            response: response

        });

    }

    catch (error) {

        console.error(
            "Erro no chat:",
            error
        );


        return res.status(500).json({

            success: false,

            error:
                "Erro interno do servidor."

        });

    }

});


/* =====================================
   RESPOSTAS TEMPORÁRIAS
===================================== */

function getGraceResponse(message) {

    const text =
        normalizeText(message);


    if (
        text.includes("oi") ||
        text.includes("ola")
    ) {

        return `
            <strong>Olá! 😊</strong>

            <p>
                Eu sou a Grace.
                Como posso ajudar você?
            </p>
        `;

    }


    if (
        text.includes("horario") ||
        text.includes("funciona")
    ) {

        return `
            <strong>Horários 🕐</strong>

            <p>
                O atendimento funciona
                de segunda a sexta,
                das 8h às 18h.
            </p>
        `;

    }


    if (
        text.includes("servico") ||
        text.includes("servicos")
    ) {

        return `
            <strong>Serviços ✨</strong>

            <p>
                Posso ajudar você a conhecer
                nossos serviços.
            </p>
        `;

    }


    if (
        text.includes("pagamento") ||
        text.includes("pix") ||
        text.includes("cartao")
    ) {

        return `
            <strong>Pagamento 💳</strong>

            <p>
                Podemos trabalhar com Pix,
                cartão e outras formas
                de pagamento.
            </p>
        `;

    }


    if (
        text.includes("atendente") ||
        text.includes("humano")
    ) {

        return `
            <strong>Atendimento humano 👤</strong>

            <p>
                Posso encaminhar você
                para um atendente.
            </p>
        `;

    }


    return `
        <strong>Entendi 😊</strong>

        <p>
            Ainda estou aprendendo,
            mas posso ajudar com
            horários, serviços,
            pagamentos ou atendimento.
        </p>
    `;

}


/* =====================================
   NORMALIZAR TEXTO
===================================== */

function normalizeText(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}


/* =====================================
   INICIAR SERVIDOR
===================================== */

app.listen(
    PORT,
    function () {

        console.log(
            `Grace IA rodando na porta ${PORT}`
        );

    }
);
