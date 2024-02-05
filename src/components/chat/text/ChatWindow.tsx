"use client";
import React, { useEffect, useState } from "react";
import SenderTag from "./SenderTag";
import ReciverTag from "./ReciverTagV2";
import InputFormTag from "./InputFormTag";
import { useSearchParams } from "next/navigation";
import { startChart } from "~/server/chatGPT/chatgpt";
import { type MessageInterface } from "model";
import { useSession } from "next-auth/react";
import { getFeedPrompt } from "~/server/chatGPT/PromptHelper";

function ChatWindow() {
  const searchParams = useSearchParams();
  const session = useSession();
  const [isLearningMode, setIsLearningMode] = useState(false);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const sceneId = searchParams?.get("sceneId");
  const characterId = searchParams?.get("characterId");
  const [loading, setLoading] = useState<boolean>(true);
  const nativeLanguageCode = session?.data?.user?.nativeLanguageSetting? session?.data?.user?.nativeLanguageSetting: "en-US";
  const targetLanguageCode = session?.data?.user?.targetLanguageSetting? session?.data?.user?.targetLanguageSetting: "en-US";
  const chatPropmt=getFeedPrompt(sceneId,nativeLanguageCode,targetLanguageCode,isLearningMode);

  // useEffect(() => {
  //   const sendObj: MessageInterface = {
  //     role: "system",
  //     content: chatPropmt,
  //     voiceUrl: null,
  //   };
  //   setMessages((prevMessages) => [...prevMessages, sendObj]);
  //   if (messages.length === 0) {
  //     startChart([...messages, sendObj])
  //       .then((response) => {
  //         const res = response as MessageInterface;
  //         res.voiceUrl = null;
  //         setMessages((prevMessages) => [...prevMessages, res]);
  //       })
  //       .catch((errors) => {
  //         console.log("error", errors);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === "user") {
        setLoading(true);
      } else if (lastMessage && lastMessage.role === "assistant") {
        setLoading(false);
      }
      console.log("Last message:", lastMessage);
    }
  }, [messages]); 

  return (
    <div className="flex h-screen flex-row justify-between bg-white">
      <div className="flex w-full mx-auto md:w-[550px] flex-col justify-between bg-gray-600 rounded-2xl">
        <div
          className="mt-5 flex flex-col overflow-y-scroll px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {messages?.map((data: MessageInterface, index: number) => (
            <div key={index}>
              {data.role === "user" && <SenderTag text={data.content} />}
              {data.role === "assistant" && (
                <ReciverTag
                  text={data.content}
                  audioUrl={data.voiceUrl}
                  index={index}
                  setMessages={setMessages}
                />
              )}
            </div>
          ))}
          {loading && (
            <span className="h-8 w-8 border-gray-500 text-black">
              Loading.......
            </span>
          )}
        </div>
        <InputFormTag setMessages={setMessages} chatHistory={messages} />
      </div>
    </div>
  );
}

export default ChatWindow;
