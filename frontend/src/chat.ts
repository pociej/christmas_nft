import { useState } from "react";

export type Message = {
  from: "user" | "chat";
  message: string;
};

export function useConversation() {
  const [stage, setStage] = useState<
    "CODE" | "WISH" | "FINISH" | "IMAGE_GENERATING" | "IREADY_READY" | "BLOCKED"
  >("CODE");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "chat",
      message: "Ho ho ho, give me your secret code",
    },
  ]);

  const santaSay = (message: string) => {
    setMessages((msgs) => [
      ...msgs,
      {
        from: "chat",
        message,
      },
    ]);
  };
  const reply = (message: string) => {
    setMessages((msgs) => [
      ...msgs,
      {
        from: "user",
        message,
      },
    ]);
    if (stage === "CODE") {
      fetch(`${import.meta.env.VITE_SERVER_URL}/checkToken?token=` + message)
        .then((res) => res.json())
        .then((user) => {
          setTimeout(() => {
            setIsProcessing(false);

            if (user.name) {
              setUserName(user.name);

              if (user.used) {
                setMessages((msgs) => [
                  ...msgs,
                  {
                    from: "chat",
                    message: `OH hello ${user.name}! You have already been here for a gift!`,
                  },
                ]);
                setStage("BLOCKED");
              } else {
                setMessages((msgs) => [
                  ...msgs,
                  {
                    from: "chat",
                    message: `OH hello ${user.name}! Have you been naughty or nice this year?`,
                  },
                ]);
              }

              setStage("WISH");
            } else {
              setMessages((msgs) => [
                ...msgs,
                {
                  from: "chat",
                  message: `I dont know you!`,
                },
              ]);
            }
          }, 1000);
        });
    } else if (stage === "WISH") {
      fetch(`${import.meta.env.VITE_SERVER_URL}/replyToWish?wish=` + message)
        .then((res) => res.json())
        .then((response) => {
          setTimeout(() => {
            setIsProcessing(false);
            setMessages((msgs) => [
              ...msgs,
              {
                from: "chat",
                message: response.reply,
              },
            ]);
            setStage("FINISH");
          }, 1000);
        });
    }

    setIsProcessing(true);
    //TODO wait for server reply
  };
  return {
    messages,
    reply,
    isProcessing,
    stage,
    userName,
    setStage,
    santaSay,
  };
}
