"use client";

import { Fragment, useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import RoomDetails from "./RoomDetails";

const ANIMATION_MS = 1000;

export default function RoomsRow({ rooms }) {
    const [openIndex, setOpenIndex] = useState(null);
    const [pendingOpen, setPendingOpen] = useState(null);

    useEffect(() => {
        if (openIndex === null && pendingOpen !== null) {
            const timeout = setTimeout(() => {
                setOpenIndex(pendingOpen);
                setPendingOpen(null);
            }, ANIMATION_MS);
            return () => clearTimeout(timeout);
        }
    }, [openIndex, pendingOpen]);

    function handleClick(i) {
        if (openIndex === i) {
            setPendingOpen(null);
            setOpenIndex(null);
        } else if (openIndex === null) {
            setPendingOpen(null);
            setOpenIndex(i);
        } else {
            setPendingOpen(i);
            setOpenIndex(null);
        }
    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-flow-dense gap-x-4">
            {rooms.map((room, i) => (
                <Fragment key={room.id}>
                    <button
                        type="button"
                        className="w-full"
                        onClick={() => handleClick(i)}
                        aria-expanded={openIndex === i}
                    >
                        <RoomCard room={room} />
                    </button>
                    <div
                        className={`col-span-2 grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                            openIndex === i ? "[grid-template-rows:1fr] opacity-100" : "[grid-template-rows:0fr] opacity-0"
                        }`}
                    >
                        <div className="min-h-0 overflow-hidden" aria-hidden={openIndex !== i}>
                            <RoomDetails room={room} type="gallery" />
                        </div>
                    </div>
                </Fragment>
            ))}
        </div>
    );
}