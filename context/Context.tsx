/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PlacesI } from '../types/basicInformation'

const Context = createContext({
  searchResultId: '',
  setSearchResultId: (searchId: string) => {},
  departureInfo: { iataCode: '', title: '', isCity: false },
  setDepartureInfo: (DepartureInfo: PlacesI) => {},
})

interface ContextContainerPropsI {
  children: React.ReactElement
}

export function ContextContainer({ children }: ContextContainerPropsI) {
  const [searchResultId, setSearchResultId] = useState('')
  const [departureInfo, setDepartureInfo] = useState<PlacesI>()

  const value = useMemo(
    () => ({
      searchResultId,
      setSearchResultId,
      departureInfo: departureInfo as PlacesI,
      setDepartureInfo,
    }),
    [searchResultId, departureInfo]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useAppContext = () => useContext(Context)
