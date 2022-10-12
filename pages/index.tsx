import type { NextPage } from "next"
import { useContext } from "react"
import { ConnectWalletButton } from "../components/ConnectWalletButton"
import { JoinGuild } from "../components/JoinGuild"
import { LoginSuccess } from "../components/LoginSuccess"
import { WalletContext } from "../context/WalletContext"

const Home: NextPage = () => {
  const { isSubmit } = useContext(WalletContext)
  return (
    <>
      <ConnectWalletButton />
      <JoinGuild />
      {isSubmit ? <LoginSuccess /> : null}
    </>
  )
}

export default Home
