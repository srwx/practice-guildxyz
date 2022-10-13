import { useState, createContext, ReactNode } from "react"
import { Bytes } from "ethers"
import { user } from "@guildxyz/sdk"
import { GUILD_ID } from "../constants/guild"

interface ContextProps {
  onTokenSubmit: (
    access_token: string,
    addr: string,
    signerFunction: (signableMessage: string | Bytes) => Promise<string>
  ) => Promise<void>
  isLoading: boolean
  result: { success: boolean; text?: string }
  isSubmit: boolean
}

export const WalletContext = createContext<ContextProps>(null!)

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<{ success: boolean; text?: string }>({
    success: false,
  })
  const [isSubmit, setIsSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onTokenSubmit = async (
    access_token: string,
    addr: string,
    signerFunction: (signableMessage: string | Bytes) => Promise<string>
  ) => {
    try {
      setIsLoading(true)
      const res = await user.join(GUILD_ID, addr, signerFunction, [
        {
          name: "DISCORD",
          authData: {
            access_token: access_token,
          },
        },
      ])
      setResult({ success: res.success })
      setIsSubmit(true)
      setIsLoading(false)
    } catch (err) {
      setResult({ success: false, text: (err as Error).message })
      setIsSubmit(true)
      setIsLoading(false)
    }
  }

  return (
    <WalletContext.Provider
      value={{
        onTokenSubmit,
        isLoading,
        result,
        isSubmit,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
