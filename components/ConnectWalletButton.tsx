import React, { useContext } from "react"
import { WalletContext } from "../context/WalletContext"
import { shortenAddress } from "../utils/shortenAddress"

export const ConnectWalletButton = () => {
  const { walletAddress, connectWallet } = useContext(WalletContext)
  const shortenAddr = shortenAddress(walletAddress)
  return (
    <div className="flex justify-end items-center h-16 bg-slate-300">
      <div
        className="bg-green-700 px-4 py-2 rounded-md mr-5 text-white"
        onClick={connectWallet}
      >
        {shortenAddr ? shortenAddr : "Connect Wallet"}
      </div>
    </div>
  )
}
