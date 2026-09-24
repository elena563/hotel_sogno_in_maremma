export default function RoomDetails({ room, type }) {
    return (
          <div className="flex flex-col md:flex-row gap-2 p-4 bg-surface">
            <div>
            <h3 className="text-secondary w-full font-heading font-semibold text-xl">{room.name}</h3>
            {room.square_meters_double && (
                <span className="text-sm">{room.square_meters_double} m² double</span>
            )}
            {room.square_meters_quadruple && (
                <span className="text-sm"> | {room.square_meters_quadruple} m² quadruple</span>
            )}
            <p className="border-t border-t-secondary mt-2 pt-2">{room.description}</p>
            </div>
           
        </div>
    );
}