import Image from "next/image";

export default function RoomCard({ room }) {
    
  return (
    <div className="flex flex-col">
        <div className="relative w-full h-64 md:h-56">
            <Image
                src={room.header_image} alt={room.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
            />
            <div className="absolute inset-0 flex w-full items-center justify-center cursor-pointer">
                <h3 className="text-secondary bg-surface/75 w-full py-5 font-heading font-semibold text-2xl text-center px-4">
                {room.name}
                </h3>
            </div>
        </div>
    </div>
  );
}