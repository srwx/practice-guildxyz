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
  isSuccess: boolean
  isSubmit: boolean
}

export const WalletContext = createContext<ContextProps>(null!)

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isSuccess, setIsSuccrss] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onTokenSubmit = async (
    access_token: string,
    addr: string,
    signerFunction: (signableMessage: string | Bytes) => Promise<string>
  ) => {
    setIsLoading(true)
    const res = await user.join(GUILD_ID, addr, signerFunction, [
      {
        name: "DISCORD",
        authData: {
          access_token: access_token,
        },
      },
    ])

    setIsSuccrss(res.success)
    setIsSubmit(true)
    setIsLoading(false)
  }

  return (
    <WalletContext.Provider
      value={{
        onTokenSubmit,
        isLoading,
        isSuccess,
        isSubmit,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
