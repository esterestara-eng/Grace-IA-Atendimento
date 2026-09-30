require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database("./grace.db", (error) => {
    if (error) {
        console.error("Erro ao conectar ao banco:", error);
        return;
    }

    console.log("Banco de dados da Grace conectado.");
});

db.run(`
    CREATE TABLE IF NOT EXISTS atendimentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_cliente VARCHAR(100),
        mensagem TEXT NOT NULL,
        resposta TEXT,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`, (error) => {
    if (error) {
        console.error("Erro ao criar tabela:", error);
        return;
    }

    console.log("Tabela de atendimentos pronta.");
});

app.use(cors());
app.use(express.json());


app.get("/", function (req, res) {

    res.json({
        success: true,
        message: "Servidor da Grace IA funcionando.",
        version: "1.0.0"
    });

});


app.get("/api/status", function (req, res) {

    res.json({
        online: true,
        assistant: "Grace IA",
        message: "A Grace está online."
    });

});


app.post("/api/chat", async function (req, res) {

    try {

        const message = req.body.message;

        if (
            typeof message !== "string" ||
            !message.trim()
        ) {

            return res.status(400).json({
                success: false,
                error: "Mensagem inválida."
            });

        }

        const cleanMessage =
            message.trim();

        const completion = await groq.chat.completions.create({
                model: "openai/gpt-oss-20b",
         messages: [
        {
            role: "system",
content: `
Você é a Grace, assistente virtual da loja Mestre das Cores.
Atenda em português do Brasil, com simpatia e respostas claras.
Use texto simples, sem HTML ou Markdown.

Informações confirmadas da loja:
- Trabalhamos com tintas automotivas e imobiliárias.
- Atendimento de segunda a sexta-feira, das 8h às 18h.
- Aos sábados, das 8h às 13h.
- Aceitamos cartão, Pix e dinheiro.
- Também atendemos pelo WhatsApp: (11) 95684-2356.
- Fazemos entregas em César de Souza e Mogi das Cruzes.
- Taxas, prazos e disponibilidade de entrega devem ser confirmados pelo WhatsApp.

Não invente preços, estoque, marcas, endereço, promoções ou parcelamento.
Quando não tiver uma informação, oriente o cliente a confirmar pelo WhatsApp.
Não afirme que realizou pedidos, pagamentos, agendamentos ou encaminhamentos.
Se o cliente pedir atendimento humano, informe o WhatsApp da loja.
`},
        {
            role: "user",
            content: cleanMessage
        }
    ],
    max_completion_tokens: 1500,
reasoning_effort: "low"
});

const response = completion.choices[0]?.message?.content?.trim();

if (!response) {
    throw new Error("A Groq retornou uma resposta vazia.");
}

        /* =============================
           SALVAR ATENDIMENTO NO SQLITE
        ============================= */

        const sql = `
            INSERT INTO atendimentos
            (
                nome_cliente,
                mensagem,
                resposta
            )
            VALUES (?, ?, ?)
        `;


        db.run(
            sql,
            [
                "Cliente",
                cleanMessage,
                response
            ],
            function (error) {

                if (error) {

                    console.error(
                        "Erro ao salvar atendimento:",
                        error
                    );

                    return res.status(500).json({
                        success: false,
                        error:
                            "Não foi possível salvar o atendimento."
                    });

                }


                /* =============================
                   DEVOLVER RESPOSTA
                ============================= */

                return res.json({

                    success: true,

                    response: response,

                    atendimento_id:
                        this.lastID

                });

            }
        );

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

function getGraceResponse(message) {
    const text = normalizeText(message);


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


function normalizeText(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}


app.listen(
    PORT,
    function () {

        console.log(
            `Grace IA rodando na porta ${PORT}`
        );

    }
);
