# Configuração do Supabase para Anexos

## 1. Criar Bucket no Supabase Storage

1. Acesse o dashboard do Supabase
2. Vá para Storage > Buckets
3. Clique em "Create a new bucket"
4. Configure:
   - **Name**: `transaction-attachments`
   - **Public bucket**: ✅ (para permitir acesso público aos arquivos)
   - **File size limit**: 10MB
   - **Allowed MIME types**: `image/*,application/pdf,text/*`

## 2. Criar Tabela para Anexos

Execute o seguinte SQL no SQL Editor do Supabase:

```sql
-- Criar tabela para anexos de transações
CREATE TABLE transaction_attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX idx_transaction_attachments_transaction_id ON transaction_attachments(transaction_id);
CREATE INDEX idx_transaction_attachments_created_at ON transaction_attachments(created_at);

-- Configurar RLS (Row Level Security)
ALTER TABLE transaction_attachments ENABLE ROW LEVEL SECURITY;

-- Política para permitir acesso aos anexos das transações do usuário
CREATE POLICY "Users can view their own transaction attachments" ON transaction_attachments
  FOR SELECT USING (
    transaction_id IN (
      SELECT t.id FROM transactions t
      JOIN accounts a ON t.account_id = a.id
      JOIN users u ON a.user_id = u.id
      WHERE u.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own transaction attachments" ON transaction_attachments
  FOR INSERT WITH CHECK (
    transaction_id IN (
      SELECT t.id FROM transactions t
      JOIN accounts a ON t.account_id = a.id
      JOIN users u ON a.user_id = u.id
      WHERE u.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own transaction attachments" ON transaction_attachments
  FOR DELETE USING (
    transaction_id IN (
      SELECT t.id FROM transactions t
      JOIN accounts a ON t.account_id = a.id
      JOIN users u ON a.user_id = u.id
      WHERE u.auth_user_id = auth.uid()
    )
  );
```

## 3. Configurar Políticas do Storage

No dashboard do Supabase, vá para Storage > Policies e configure:

### Para o bucket `transaction-attachments`:

**SELECT Policy:**
- Policy name: `Public access to transaction attachments`
- Allowed operation: SELECT
- Target roles: `anon`, `authenticated`
- Using expression: `true`

**INSERT Policy:**
- Policy name: `Authenticated users can upload attachments`
- Allowed operation: INSERT
- Target roles: `authenticated`
- Using expression: `bucket_id = 'transaction-attachments'`

**UPDATE Policy:**
- Policy name: `Users can update their own attachments`
- Allowed operation: UPDATE
- Target roles: `authenticated`
- Using expression: `bucket_id = 'transaction-attachments'`

**DELETE Policy:**
- Policy name: `Users can delete their own attachments`
- Allowed operation: DELETE
- Target roles: `authenticated`
- Using expression: `bucket_id = 'transaction-attachments'` 