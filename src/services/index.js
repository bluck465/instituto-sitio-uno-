/**
 * index.js — Barrel export de services
 *
 * Que hace: Re-exporta todo lo que la app necesita del layer de servicios.
 * Por que:   Para que los imports sean limpios:
 *            import { db } from '../services'
 *            import { httpClient } from '../services'
 */

export { db } from './dbProvider'
export { httpClient } from './httpClient'
