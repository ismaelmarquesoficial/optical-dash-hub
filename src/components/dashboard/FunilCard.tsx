import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreVertical, TrendingUp, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface FunilCardProps {
  titulo: string
  total: number
  etapas: {
    nome: string
    quantidade: number
    cor: string
  }[]
  className?: string
}

export function FunilCard({ titulo, total, etapas, className }: FunilCardProps) {
  return (
    <Card className={cn("pipeline-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-8 bg-gradient-primary rounded-full" />
          <CardTitle className="text-lg font-semibold">{titulo}</CardTitle>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-2xl font-bold text-foreground">{total}</span>
            <span className="text-sm text-muted-foreground">leads</span>
          </div>
          <div className="flex items-center space-x-1 text-success text-sm">
            <TrendingUp className="h-3 w-3" />
            <span>+12%</span>
          </div>
        </div>
        
        <div className="space-y-2">
          {etapas.map((etapa, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: etapa.cor }}
                />
                <span className="text-sm font-medium">{etapa.nome}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {etapa.quantidade}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}