-- Criar tabelas para o sistema de gestão ótica

-- Tabela de profissionais/usuários do sistema
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT,
  cargo TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de fontes de lead
CREATE TABLE public.fontes_lead (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de leads/clientes
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  fonte_id UUID REFERENCES public.fontes_lead(id),
  data_primeiro_contato DATE DEFAULT CURRENT_DATE,
  funil_atual INTEGER DEFAULT 1, -- 1: Captação, 2: Venda, 3: Pós-venda, 4: Perdidas
  etapa_atual TEXT DEFAULT 'Novo Lead',
  status_final TEXT,
  valor_orcamento DECIMAL(10,2),
  valor_venda DECIMAL(10,2),
  data_consulta TIMESTAMP WITH TIME ZONE,
  data_agendamento TIMESTAMP WITH TIME ZONE,
  data_venda TIMESTAMP WITH TIME ZONE,
  motivo_nao_comprou TEXT,
  observacoes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de consultas
CREATE TABLE public.consultas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  profissional_id UUID REFERENCES public.profiles(id),
  data_consulta TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'agendada', -- agendada, realizada, nao_compareceu, cancelada
  observacoes TEXT,
  prescricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de metas
CREATE TABLE public.metas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profissional_id UUID REFERENCES public.profiles(id),
  tipo TEXT NOT NULL, -- consultas, faturamento
  periodo_inicio DATE NOT NULL,
  periodo_fim DATE NOT NULL,
  valor_meta DECIMAL(10,2) NOT NULL,
  valor_atual DECIMAL(10,2) DEFAULT 0,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de histórico de mudanças de etapa
CREATE TABLE public.historico_etapas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  funil_anterior INTEGER,
  etapa_anterior TEXT,
  funil_novo INTEGER,
  etapa_nova TEXT,
  observacoes TEXT,
  alterado_por UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fontes_lead ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historico_etapas ENABLE ROW LEVEL SECURITY;

-- Policies para profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies para fontes_lead (todos podem ver)
CREATE POLICY "Anyone can view fontes_lead" ON public.fontes_lead FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage fontes_lead" ON public.fontes_lead FOR ALL USING (auth.role() = 'authenticated');

-- Policies para leads (todos os usuários autenticados podem gerenciar)
CREATE POLICY "Authenticated users can view leads" ON public.leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert leads" ON public.leads FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update leads" ON public.leads FOR UPDATE USING (auth.role() = 'authenticated');

-- Policies para consultas
CREATE POLICY "Authenticated users can manage consultas" ON public.consultas FOR ALL USING (auth.role() = 'authenticated');

-- Policies para metas
CREATE POLICY "Authenticated users can manage metas" ON public.metas FOR ALL USING (auth.role() = 'authenticated');

-- Policies para histórico_etapas
CREATE POLICY "Authenticated users can view historico" ON public.historico_etapas FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert historico" ON public.historico_etapas FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Inserir algumas fontes de lead padrão
INSERT INTO public.fontes_lead (nome, descricao) VALUES
  ('WhatsApp', 'Contatos via WhatsApp Business'),
  ('Instagram', 'Leads das redes sociais'),
  ('Indicação', 'Indicações de outros pacientes'),
  ('Google Ads', 'Campanhas do Google'),
  ('Site', 'Contato através do site'),
  ('Busca Orgânica', 'Encontrou pela pesquisa no Google');

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_consultas_updated_at BEFORE UPDATE ON public.consultas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_metas_updated_at BEFORE UPDATE ON public.metas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();