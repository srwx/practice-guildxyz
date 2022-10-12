import { ethers } from "ethers"
import type { NextPage } from "next"
import { useState } from "react"
import { ConnectWalletButton } from "../components/ConnectWalletButton"
import { JoinGuild } from "../components/JoinGuild"

const Home: NextPage = () => {
  return (
    <>
      <ConnectWalletButton />
      <JoinGuild />
    </>
  )
}

export default Home
