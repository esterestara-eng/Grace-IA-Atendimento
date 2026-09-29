-- Banco de dados da Grace
-- Estrutura para armazenar clientes e histórico de atendimentos.

CREATE TABLE IF NOT EXISTS atendimentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_cliente VARCHAR(100),
    mensagem TEXT NOT NULL,
    resposta TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para facilitar a busca pelo cliente
CREATE INDEX IF NOT EXISTS idx_atendimentos_nome_cliente
ON atendimentos(nome_cliente);

-- Índice para consultas por data
CREATE INDEX IF NOT EXISTS idx_atendimentos_criado_em
ON atendimentos(criado_em);
