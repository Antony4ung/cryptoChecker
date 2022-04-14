import React, { createContext, useEffect, useState } from 'react'

export const Context = createContext({toggleColorMode:()=>{}})

export default function ContextProvider({children}) {

    const [currency, setCurrency] = useState("USD");

    

    const [symbol,setSymbol] = useState('$')


    const [mode, setMode] = useState('dark');

    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
    );



    
    useEffect(()=>{
      switch (currency){
        case 'USD':{
          setSymbol('$')
          break;
        }
        case 'MMK':{
          setSymbol('K')
          break;
        }
        case 'SGD':{
          setSymbol('S$')
          break;
        }
        case 'THB':{
          setSymbol('฿')
          break;
        }
        default :
        return

      }
    },[currency])

  return (
    <Context.Provider value={{currency,setCurrency,symbol,mode,colorMode}}>
        {children}
    </Context.Provider>
  )
}
