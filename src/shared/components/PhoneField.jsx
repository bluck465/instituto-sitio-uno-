import { useState, useRef, useEffect, useMemo } from 'react'
import { countryCodes } from '../data/countryCodes'
import { storage } from '../../services/storage'

const LS_KEY = 'preferredCountry'

function parsePhoneValue(defaultValue, defaultCode) {
  if (!defaultValue || typeof defaultValue !== 'string') return { code: defaultCode, number: '' }
  const parts = defaultValue.trim().split(' ')
  if (parts.length >= 2 && parts[0].startsWith('+')) {
    return { code: parts[0], number: parts.slice(1).join('') }
  }
  return { code: defaultCode, number: defaultValue }
}

export function PhoneField({ name = 'telefono', defaultCountry = '+58', defaultValue = '', required = false }) {
  const parsed = parsePhoneValue(defaultValue, defaultCountry)
  const [selected, setSelected] = useState(() => {
    const saved = storage.get(LS_KEY)
    if (saved) {
      const found = countryCodes.find((c) => c.code === saved)
      if (found) return found
    }
    const fallback = countryCodes.find((c) => c.code === parsed.code)
    if (fallback) return fallback
    return countryCodes[0]
  })
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [localNumber, setLocalNumber] = useState(parsed.number)
  const inputRef = useRef(null)
  const rootRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return countryCodes
    const q = query.toLowerCase()
    return countryCodes.filter(
      (c) => c.label.toLowerCase().includes(q) || c.code.includes(q)
    )
  }, [query])

  function select(country) {
    setSelected(country)
    setOpen(false)
    setQuery('')
    storage.set(LS_KEY, country.code)
    inputRef.current?.focus()
  }

  const fullNumber = `${selected.code} ${localNumber}`.trim()

  return (
    <label className="field phone-field">
      <span>Teléfono</span>
      <div className="phone-field__wrapper" ref={rootRef}>
        <button
          type="button"
          className="phone-field__code-btn"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="phone-field__flag">{selected.flag}</span>
          <span className="phone-field__code-text">{selected.code}</span>
          <span className={`phone-field__arrow ${open ? 'phone-field__arrow--up' : ''}`}>
            ▾
          </span>
        </button>

        {open && (
          <div className="phone-field__dropdown">
            <input
              className="phone-field__search"
              type="text"
              placeholder="Buscar país…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <ul className="phone-field__list">
              {filtered.map((country) => (
                <li key={country.code + country.label}>
                  <button
                    type="button"
                    className={`phone-field__option ${
                      country.code === selected.code && country.label === selected.label
                        ? 'phone-field__option--active'
                        : ''
                    }`}
                    onClick={() => select(country)}
                  >
                    <span className="phone-field__flag">{country.flag}</span>
                    <span className="phone-field__option-label">{country.label}</span>
                    <span className="phone-field__option-code">{country.code}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="phone-field__no-results">Sin resultados</li>
              )}
            </ul>
          </div>
        )}

        <input
          ref={inputRef}
          className="phone-field__input"
          type="tel"
          placeholder="Número telefónico"
          value={localNumber}
          onChange={(e) => setLocalNumber(e.target.value)}
          required={required}
        />
      </div>
      <input type="hidden" name={name} value={fullNumber} />
    </label>
  )
}
