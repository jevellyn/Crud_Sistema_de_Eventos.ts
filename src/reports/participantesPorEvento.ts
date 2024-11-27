import { ObjectId } from "mongodb";
import { connectToDatabase, db } from "../conexion/connection";


export const participantesPorEvento = async () => {
    await connectToDatabase(); 

    

    const pipeline = [
        {
            $lookup: {
                from: "participante_evento", 
                localField: "_id",  
                foreignField: {eventoId: new ObjectId("eventoId")}, 
            }
        },
        {
            $addFields: {
                totalParticipantes: { $size: "$participantes" }
            }
        },
        {
            $group: {
                _id: "$tipoEvento", 
                total_participantes: { $sum: "$totalParticipantes" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ];

    const collection = db.collection("eventos"); 
    const result = await collection.aggregate(pipeline).toArray();
    console.table(result);
};
