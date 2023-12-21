import { Dispatch, SetStateAction, useState } from "react";

import "./App.css";
import "./dots.css";
import { Message, useConversation } from "./chat";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { useWeb3Modal } from "@web3modal/wagmi/react";

import { WagmiConfig, useNetwork } from "wagmi";
import { polygon } from "viem/chains";

import { useContractWrite } from "wagmi";
import abi from "./abi.json";
import { useAccount } from "wagmi";
import { switchNetwork } from "@wagmi/core";
// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "1a29e8e0d60e68a33748d34a321f8bc0";
// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const isFemale = (name: string) => {
  return name.endsWith("a");
};

const chains = [polygon];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

// export default function App() {
//   return <WagmiConfig config={wagmiConfig}>// Rest of your app...</WagmiConfig>;
// }

function App() {
  const {
    messages: conversation,
    reply,
    isProcessing,
    stage,
    userName,
    setStage,
    santaSay,
  } = useConversation();

  const [userToken, setUserToken] = useState("");
  const [image, setImage] = useState("");
  return (
    <WagmiConfig config={wagmiConfig}>
      <div className="wrapper">
        <div className="snow layer1 a"></div>
        <div className="snow layer1"></div>
        <div className="snow layer2 a"></div>
        <div className="snow layer2"></div>
        <div className="snow layer3 a"></div>
        <div className="snow layer3"></div>
        <div className="pt-24 flex items-center justify-center">
          <div className="w-80 ">
            <img src="golem.xmas.png" />
          </div>
        </div>
        <div className="card flex justify-center items-center">
          <div className="w-4/12 mt-10">
            {conversation.map(({ from, message }: Message) => {
              if (from === "chat") {
                return (
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src="santa.png"
                        />
                      </div>
                    </div>
                    <div className="chat-bubble chat-bubble-primary">
                      {message}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="chat chat-end">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src={
                            isFemale(userName)
                              ? "laughinglady.png"
                              : "laughingman.png"
                          }
                        />
                      </div>
                    </div>
                    <div className="chat-bubble chat-bubble-error">
                      {message}
                    </div>
                  </div>
                );
              }
            })}
            {isProcessing && (
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="santa.png"
                    />
                  </div>
                </div>
                <div className="chat-bubble chat-bubble-primary">
                  <div className="dot-typing ml-4 mr-4 mt-2"></div>
                </div>
              </div>
            )}
          </div>

          {stage !== "BLOCKED" &&
            stage !== "FINISH" &&
            stage !== "IMAGE_GENERATING" &&
            stage !== "IREADY_READY" && (
              <input
                type="text"
                placeholder="Type here"
                className="input mt-10 input-bordered w-full max-w-xs"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (stage === "CODE") {
                      console.log("setting user token");
                      setUserToken(e.currentTarget.value);
                    }
                    reply(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
            )}
          {stage === "FINISH" ? (
            <Web3Button
              userToken={userToken}
              setStage={setStage}
              santaSay={santaSay}
              setImage={setImage}
            />
          ) : (
            ""
          )}
          {stage === "IMAGE_GENERATING" ? (
            <>
              <div
                className="card w-96 h-96  mt-10 flex justify-center items-center"
                style={{
                  backgroundImage: "url('gift.png')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  opacity: 0.3,
                }}
              ></div>
            </>
          ) : (
            ""
          )}
          {
            stage === "IREADY_READY" ? (
              <>
                <div
                  className="card w-96 h-96  mt-10 flex justify-center items-center"
                  // style={{
                  //   backgroundSize: "contain",
                  //   backgroundRepeat: "no-repeat",
                  //   backgroundPosition: "center",
                  // }}
                >
                  <img style={{ borderRadius: "10px" }} src={image} />
                </div>
              </>
            ) : (
              ""
            )
            // <div className="mt-10">
            //   <h2 className="text-center text-white">Your gift is ready</h2>
            // </div>
          }
        </div>
      </div>
    </WagmiConfig>
  );
}

export default App;

const Web3Button = ({
  userToken,
  setStage,
  santaSay,
  setImage,
}: {
  setStage: Dispatch<
    SetStateAction<
      | "CODE"
      | "WISH"
      | "FINISH"
      | "IMAGE_GENERATING"
      | "IREADY_READY"
      | "BLOCKED"
    >
  >;
  userToken: string;
  santaSay: (message: string) => void;
  setImage: (image: string) => void;
}) => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const { chain } = useNetwork();

  const ensurePolygon = () => {
    if (chain?.id !== 137) {
      return switchNetwork({ chainId: 137 });
    } else {
      return Promise.resolve();
    }
  };
  console.log("chain", chain);
  const { write } = useContractWrite({
    address: "0x19351202fdfB7A3fe87F809303CD4b7201E91654",
    abi,
    functionName: "mintWithOneTimeToken",
  }); // const { write } = useContractWrite(config);
  return (
    <>
      {!address && (
        <button
          className="btn btn-primary mt-10"
          onClick={() => {
            open();
          }}
        >
          Connect Wallet
        </button>
      )}
      {address && (
        <button
          className="btn btn-primary mt-10"
          onClick={() => {
            console.log("clicked");
            ensurePolygon()
              .then(() => {
                console.log("switched network");
                console.log("clicked", address);
                console.log("userToken", userToken);

                setStage("IMAGE_GENERATING");
                santaSay("Please wait santa is preparing your gift");
                fetch(
                  `${
                    import.meta.env.VITE_SERVER_URL
                  }/getImage?token=${userToken}`
                )
                  .then((res) => res.json())
                  .then((res) => {
                    console.log("res", res);
                    setImage(res.image);
                    write({ args: [userToken, res.json] });
                    santaSay("Here it is, your duck");
                  });
              })
              .catch((e) => {
                console.log("error", e);
              });
          }}
        >
          Mint
        </button>
      )}
    </>
  );
};
