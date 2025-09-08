import { useState } from "react"
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Target, 
  Settings, 
  PieChart,
  TrendingUp,
  FileText,
  CreditCard,
  Building2,
  Smartphone,
  MessageSquare,
  Workflow,
  UserCheck,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const comercialItems = [
  { title: "Dashboard", url: "/comercial", icon: BarChart3 },
  { title: "Pipeline", url: "/comercial/pipeline", icon: Workflow, hasSubmenu: true },
  { title: "Consultas", url: "/comercial/consultas", icon: Calendar },
  { title: "Agendamento", url: "/comercial/agendamento", icon: UserCheck },
  { title: "Metas", url: "/comercial/metas", icon: Target },
  { title: "Chat", url: "/comercial/chat", icon: MessageSquare },
  { title: "Configurações", url: "/comercial/config", icon: Settings, hasSubmenu: true },
]

const financeiroItems = [
  { title: "Dashboard", url: "/financeiro", icon: PieChart },
  { title: "Lançamentos", url: "/financeiro/lancamentos", icon: FileText },
  { title: "Contas a Pagar", url: "/financeiro/contas-pagar", icon: CreditCard },
  { title: "Crediário", url: "/financeiro/crediario", icon: Building2 },
  { title: "Planejamento", url: "/financeiro/planejamento", icon: Target },
  { title: "DRE", url: "/financeiro/dre", icon: TrendingUp },
  { title: "DFC", url: "/financeiro/dfc", icon: TrendingUp },
  { title: "Balanço", url: "/financeiro/balanco", icon: BarChart3 },
  { title: "Ativos", url: "/financeiro/ativos", icon: Building2 },
  { title: "Contas", url: "/financeiro/contas", icon: FileText },
  { title: "Categorias", url: "/financeiro/categorias", icon: Settings },
]

const gestaoItems = [
  { title: "Planejamento de Compras", url: "/gestao/compras", icon: Target },
  { title: "Metas de Faturamento", url: "/gestao/metas", icon: TrendingUp },
  { title: "Processos", url: "/gestao/processos", icon: Settings },
]

const integracoesItems = [
  { title: "SsOtica", url: "/integracoes/ssotica", icon: Building2 },
  { title: "WhatsApp", url: "/integracoes/whatsapp", icon: Smartphone },
]

const pipelineSubItems = [
  { title: "Funil 1: Captação", url: "/comercial/pipeline/captacao" },
  { title: "Funil 2: Vendas", url: "/comercial/pipeline/vendas" },
  { title: "Funil 3: Pós-Venda", url: "/comercial/pipeline/pos-venda" },
  { title: "Funil 4: Perdidas", url: "/comercial/pipeline/perdidas" },
  { title: "Gerenciar Funis", url: "/comercial/pipeline/gerenciar" },
]

const configSubItems = [
  { title: "Profissionais", url: "/comercial/config/profissionais" },
  { title: "Etapas dos Funis", url: "/comercial/config/etapas" },
  { title: "Fontes de Lead", url: "/comercial/config/fontes" },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"
  
  const [openGroups, setOpenGroups] = useState<string[]>(["comercial"])
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([])

  const toggleGroup = (groupName: string) => {
    setOpenGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    )
  }

  const toggleSubmenu = (submenuName: string) => {
    setOpenSubmenus(prev => 
      prev.includes(submenuName) 
        ? prev.filter(s => s !== submenuName)
        : [...prev, submenuName]
    )
  }

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/')
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-primary/20" : "hover:bg-accent/50"

  const renderMenuItems = (items: typeof comercialItems, groupName?: string) => {
    return items.map((item) => {
      const hasSubmenu = item.hasSubmenu && !collapsed
      const isSubmenuOpen = openSubmenus.includes(`${groupName}-${item.title.toLowerCase()}`)
      
      if (hasSubmenu) {
        return (
          <Collapsible key={item.title} open={isSubmenuOpen} onOpenChange={() => toggleSubmenu(`${groupName}-${item.title.toLowerCase()}`)}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="w-full justify-between hover:bg-accent/50">
                  <div className="flex items-center">
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.title}</span>
                  </div>
                  {isSubmenuOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.title === "Pipeline" && pipelineSubItems.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <NavLink to={subItem.url} className={getNavCls}>
                          <span className="text-sm">{subItem.title}</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                  {item.title === "Configurações" && configSubItems.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <NavLink to={subItem.url} className={getNavCls}>
                          <span className="text-sm">{subItem.title}</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )
      }

      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <NavLink to={item.url} className={getNavCls}>
              <item.icon className="h-4 w-4 mr-2" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )
    })
  }

  return (
    <Sidebar className={collapsed ? "w-16" : "w-72"}>
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ÓT</span>
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-sidebar-foreground">Ótica Dashboard</h2>
                <p className="text-xs text-muted-foreground">Gestão Completa</p>
              </div>
            )}
          </div>
        </div>

        {/* Comercial */}
        <Collapsible open={openGroups.includes("comercial")} onOpenChange={() => toggleGroup("comercial")}>
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-accent/50 rounded px-2 py-1 flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {!collapsed && "Comercial"}
                </div>
                {!collapsed && (
                  openGroups.includes("comercial") ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                )}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {renderMenuItems(comercialItems, "comercial")}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Financeiro */}
        <Collapsible open={openGroups.includes("financeiro")} onOpenChange={() => toggleGroup("financeiro")}>
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-accent/50 rounded px-2 py-1 flex items-center justify-between">
                <div className="flex items-center">
                  <PieChart className="h-4 w-4 mr-2" />
                  {!collapsed && "Financeiro"}
                </div>
                {!collapsed && (
                  openGroups.includes("financeiro") ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                )}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {renderMenuItems(financeiroItems)}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Gestão */}
        <Collapsible open={openGroups.includes("gestao")} onOpenChange={() => toggleGroup("gestao")}>
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-accent/50 rounded px-2 py-1 flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  {!collapsed && "Gestão"}
                </div>
                {!collapsed && (
                  openGroups.includes("gestao") ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                )}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {renderMenuItems(gestaoItems)}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Integrações */}
        <Collapsible open={openGroups.includes("integracoes")} onOpenChange={() => toggleGroup("integracoes")}>
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:bg-accent/50 rounded px-2 py-1 flex items-center justify-between">
                <div className="flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" />
                  {!collapsed && "Integrações"}
                </div>
                {!collapsed && (
                  openGroups.includes("integracoes") ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                )}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {renderMenuItems(integracoesItems)}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Footer com versão */}
        {!collapsed && (
          <div className="mt-auto p-4 text-center">
            <p className="text-xs text-muted-foreground">v1.0.0</p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}