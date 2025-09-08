import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Tables } from '@/integrations/supabase/types'

type Lead = Tables<'leads'>
type LeadInsert = Omit<Lead, 'id' | 'created_at' | 'updated_at'>
type LeadUpdate = Partial<Omit<Lead, 'id' | 'created_at' | 'updated_at'>>

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setLeads(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar leads')
    } finally {
      setLoading(false)
    }
  }

  const createLead = async (leadData: LeadInsert) => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert(leadData)
        .select()
        .single()

      if (error) throw error

      setLeads(prev => [data, ...prev])
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar lead'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    }
  }

  const updateLead = async (id: string, updates: LeadUpdate) => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setLeads(prev => prev.map(lead => lead.id === id ? data : lead))
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar lead'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    }
  }

  // Estatísticas por funil
  const getLeadsByFunil = (funil: number) => {
    return leads.filter(lead => lead.funil_atual === funil)
  }

  const getLeadsByEtapa = (etapa: string) => {
    return leads.filter(lead => lead.etapa_atual === etapa)
  }

  return {
    leads,
    loading,
    error,
    fetchLeads,
    createLead,
    updateLead,
    getLeadsByFunil,
    getLeadsByEtapa,
  }
}