import { MetricCard } from "@/components/dashboard/MetricCard"
import { FunilCard } from "@/components/dashboard/FunilCard"
import { Calendar, Users, Target, TrendingUp, Eye, UserPlus, ShoppingCart, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Dashboard = () => {
  // Dados simulados para demonstração
  const metricas = [
    {
      title: "Novos Leads",
      value: 47,
      icon: UserPlus,
      trend: { value: 12, label: "vs. mês anterior", positive: true }
    },
    {
      title: "Consultas Agendadas",
      value: 23,
      icon: Calendar,
      trend: { value: 8, label: "vs. semana anterior", positive: true }
    },
    {
      title: "Vendas Realizadas", 
      value: 18,
      icon: ShoppingCart,
      trend: { value: -3, label: "vs. mês anterior", positive: false }
    },
    {
      title: "Taxa de Conversão",
      value: "38%",
      icon: Target,
      trend: { value: 5, label: "vs. mês anterior", positive: true }
    }
  ]

  const funis = [
    {
      titulo: "Funil 1: Captação e Agendamento",
      total: 47,
      etapas: [
        { nome: "Novo Lead", quantidade: 15, cor: "#3b82f6" },
        { nome: "Primeiro Contato", quantidade: 12, cor: "#06b6d4" },
        { nome: "Qualificação", quantidade: 8, cor: "#10b981" },
        { nome: "Agendado", quantidade: 7, cor: "#f59e0b" },
        { nome: "Confirmado", quantidade: 5, cor: "#84cc16" }
      ]
    },
    {
      titulo: "Funil 2: Venda de Óculos",
      total: 23,
      etapas: [
        { nome: "Orçamento Apresentado", quantidade: 12, cor: "#8b5cf6" },
        { nome: "Negociação", quantidade: 7, cor: "#ec4899" },
        { nome: "Venda Realizada", quantidade: 4, cor: "#10b981" }
      ]
    },
    {
      titulo: "Funil 3: Pós-Venda",
      total: 18,
      etapas: [
        { nome: "Entrega Realizada", quantidade: 8, cor: "#06b6d4" },
        { nome: "Follow-up 7 dias", quantidade: 6, cor: "#3b82f6" },
        { nome: "Satisfação 30 dias", quantidade: 4, cor: "#10b981" }
      ]
    },
    {
      titulo: "Funil 4: Oportunidades Perdidas",
      total: 31,
      etapas: [
        { nome: "Não Compareceu", quantidade: 12, cor: "#ef4444" },
        { nome: "Não Comprou", quantidade: 10, cor: "#f59e0b" },
        { nome: "Não Responde", quantidade: 9, cor: "#6b7280" }
      ]
    }
  ]

  const proximasConsultas = [
    { paciente: "Maria Silva", horario: "09:00", tipo: "Consulta", status: "confirmada" },
    { paciente: "João Santos", horario: "10:30", tipo: "Retorno", status: "pendente" },
    { paciente: "Ana Costa", horario: "14:00", tipo: "Consulta", status: "confirmada" },
    { paciente: "Carlos Lima", horario: "15:30", tipo: "Entrega", status: "confirmada" }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Comercial</h1>
          <p className="text-muted-foreground">
            Visão geral dos seus indicadores de vendas e atendimento
          </p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Agendar Consulta
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricas.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Funis de Vendas */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Pipeline de Vendas</h2>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalhes
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {funis.map((funil, index) => (
            <FunilCard key={index} {...funil} />
          ))}
        </div>
      </div>

      {/* Próximas Consultas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Próximas Consultas - Hoje</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {proximasConsultas.map((consulta, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{consulta.paciente}</p>
                      <p className="text-sm text-muted-foreground">{consulta.tipo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{consulta.horario}</p>
                    <Badge 
                      variant={consulta.status === 'confirmada' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {consulta.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Metas do Mês */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Metas do Mês</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Consultas</span>
                <span>23/30</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '77%' }} />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Faturamento</span>
                <span>R$ 18k/25k</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '72%' }} />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Novos Clientes</span>
                <span>12/20</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard