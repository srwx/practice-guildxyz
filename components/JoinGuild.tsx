import axios from "axios"
import classNames from "classnames"
import { Bytes, ethers } from "ethers"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import { WalletContext } from "../context/WalletContext"

export const JoinGuild = () => {
  const router = useRouter()
  const { onTokenSubmit, isLoading } = useContext(WalletContext)

  const handleClick = () => {
    window.open(
      "https://discord.com/api/oauth2/authorize?client_id=1029720283076112394&redirect_uri=https%3A%2F%2Fpractice-guildxyz.vercel.app%2F&response_type=code&scope=identify%20guilds.join",
      "_blank",
      "noopener,noreferrer"
    )
  }

  useEffect(() => {
    const fetch = async () => {
      if (router.query.code) {
        /* Need to refactor */
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        )
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const addr = await signer.getAddress()
        const signerFunction = async (signableMessage: string | Bytes) =>
          await (signer as ethers.providers.JsonRpcSigner).signMessage(
            signableMessage
          )

        console.log("1")

        const res = await axios.get(
          `https://practice-guildxyz.vercel.app/api/login?code=${router.query.code}`
        )

        console.log("2")
        console.log(res.data.access_token, addr)

        onTokenSubmit(res.data.access_token, addr, signerFunction)
      }
    }

    fetch()
  }, [router.query])

  return (
    <div className="flex flex-col gap-y-4 justify-center items-center py-10">
      {/* Join section */}
      <h2 className="text-xl font-medium">You can join guild here!</h2>
      {!isLoading ? (
        <div
          className={classNames(
            "bg-orange-500 px-4 py-2 rounded-md mr-5 text-white cursor-pointer mb-16"
          )}
          onClick={handleClick}
        >
          Join Guild
        </div>
      ) : (
        <div>Loading... please wait</div>
      )}
    </div>
  )
}
