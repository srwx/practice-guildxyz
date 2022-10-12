import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react"
import { ethers, Bytes } from "ethers"
import { user } from "@guildxyz/sdk"
import { GUILD_ID } from "../constants/guild"

interface ContextProps {
  signer: ethers.providers.JsonRpcSigner | undefined
  walletAddress: string
  connectWallet: () => Promise<void>
  onTokenSubmit: () => Promise<void>
  setTokenInput: Dispatch<SetStateAction<string>>
}

export const WalletContext = createContext<ContextProps>(null!)

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [signer, setSigner] = useState<
    ethers.providers.JsonRpcSigner | undefined
  >()
  const [walletAddress, setWalletAddress] = useState("")
  const [tokenInput, setTokenInput] = useState("")

  const connectWallet = async () => {
    if (typeof window !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()

      const addr = await signer.getAddress()
      setSigner(signer)
      setWalletAddress(addr)
    }
  }

  if (typeof window !== "undefined")
    window.ethereum.on("accountsChanged", connectWallet)

  const onTokenSubmit = async () => {
    const signerFunction = async (signableMessage: string | Bytes) =>
      await (signer as ethers.providers.JsonRpcSigner).signMessage(
        signableMessage
      )
    const res = await user.join(GUILD_ID, walletAddress, signerFunction, [
      {
        name: "DISCORD",
        authData: {
          access_token: tokenInput,
        },
      },
    ])

    console.log("response: ", res)
  }

  useEffect(() => {
    connectWallet()
  }, [walletAddress])

  return (
    <WalletContext.Provider
      value={{
        signer,
        walletAddress,
        connectWallet,
        onTokenSubmit,
        setTokenInput,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}