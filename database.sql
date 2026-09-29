-- Estrutura inicial opcional para futuras versões da Grace.

CREATE TABLE IF NOT EXISTS atendimentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_cliente VARCHAR(100),
    mensagem TEXT NOT NULL,
    resposta TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
