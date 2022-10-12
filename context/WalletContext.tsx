import { useState, createContext, ReactNode } from "react"
import { ethers, Bytes } from "ethers"
import { user } from "@guildxyz/sdk"
import { GUILD_ID } from "../constants/guild"

interface ContextProps {
  signer: ethers.providers.JsonRpcSigner | undefined
  walletAddress: string
  connectWallet: () => Promise<void>
  onTokenSubmit: (
    access_token: string,
    addr: string,
    signerFunction: (signableMessage: string | Bytes) => Promise<string>
  ) => Promise<void>
  isSuccess: boolean
  isSubmit: boolean
}

export const WalletContext = createContext<ContextProps>(null!)

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [signer, setSigner] = useState<
    ethers.providers.JsonRpcSigner | undefined
  >()
  const [walletAddress, setWalletAddress] = useState("")
  const [isSuccess, setIsSuccrss] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const connectWallet = async () => {
    if (typeof window !== "undefined") {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      )
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()

      const addr = await signer.getAddress()

      setSigner(signer)
      setWalletAddress(addr)
    }
  }

  const onTokenSubmit = async (
    access_token: string,
    addr: string,
    signerFunction: (signableMessage: string | Bytes) => Promise<string>
  ) => {
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
  }

  return (
    <WalletContext.Provider
      value={{
        signer,
        walletAddress,
        connectWallet,
        onTokenSubmit,
        isSuccess,
        isSubmit,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
