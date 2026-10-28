import { TreeStructureIcon, StorefrontIcon, WrenchIcon, FilesIcon, UserIcon } from '@phosphor-icons/react'
import type { CircuitConnection, CircuitNode } from './fx/CircuitBoard'

// Orquestación multi-agente (se usa en el bento de agentes y en la pila de capacidades).
export const agentNodes: CircuitNode[] = [
  { id: 'orq', x: 260, y: 36, w: 170, label: 'Orquestador', icon: TreeStructureIcon, tone: 'accent' },
  { id: 'ventas', x: 85, y: 148, w: 150, label: 'Ventas', icon: StorefrontIcon },
  { id: 'soporte', x: 260, y: 148, w: 150, label: 'Soporte', icon: WrenchIcon },
  { id: 'backoffice', x: 435, y: 148, w: 150, label: 'Back office', icon: FilesIcon },
  { id: 'humano', x: 260, y: 258, w: 170, label: 'Asesor humano', icon: UserIcon, tone: 'sage' },
]

export const agentConnections: CircuitConnection[] = [
  { from: 'orq', to: 'ventas', route: 'v' },
  { from: 'orq', to: 'soporte', route: 'v' },
  { from: 'orq', to: 'backoffice', route: 'v' },
  { from: 'ventas', to: 'humano', route: 'v' },
  { from: 'soporte', to: 'humano', route: 'v' },
  { from: 'backoffice', to: 'humano', route: 'v' },
]
