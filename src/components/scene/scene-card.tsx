/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars4Icon } from "@heroicons/react/16/solid";
import EditSceneModal from "./edit-scene-modal";
import DeleteSceneModal from "./delete-scene-modal";
import { Scene } from "@prisma/client";
import { useRouter } from "next/navigation";
import { uid } from "uid";
function SceneCard({
  index,
  isDefault,
  scene,
}: {
  index: number;
  isDefault: boolean;
  scene?: Scene;
}) {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditOpen(true);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const handleChat = () => {
    const id = uid();
    router.push(`/chat/${id}`);
  };
  return (
    <>
      <div className="relative mt-6 flex max-w-[500px] flex-col  rounded-xl bg-yellow-100 bg-clip-border text-gray-700 shadow-md md:h-[200px]  ">
        <div className="p-4">
          <img
            className="float-left m-2 h-24 w-24  rounded-full"
            src={scene?.sceneImage}
            alt=""
          />
          <h5 className="text-blue-gray-900 mb-2 block font-sans text-lg font-semibold leading-snug tracking-normal antialiased">
            {scene?.sceneTitle}
          </h5>
          <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
            {scene?.sceneDescription}
          </p>
          <div className="float-right flex gap-2 pr-2 pt-2">
            <button
              onClick={handleChat}
              className="flex select-none items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:bg-yellow-300 active:bg-yellow-300 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Practice Language
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </button>
            <button
              onClick={handleChat}
              className="flex select-none items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:bg-yellow-300 active:bg-yellow-300 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
              type="button"
            >
              Learn Language
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <EditSceneModal open={isEditOpen} setOpen={setIsEditOpen} scene={scene} />
      <DeleteSceneModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        sceneId={scene?.id}
      />
    </>
  );
}

export default SceneCard;
