import { connectToDatabase, db } from "../conexion/connection";

export const participantesPorEvento = async () => {
    await connectToDatabase(); 

    const pipeline = [
        {
            $lookup: {
                from: "participante_evento", 
                localField: "eventoId", 
                foreignField: "eventoId", 
                as: "participantes" 
            }
        },
        {
            $group: {
                _id: "$tipoEvento", 
                total_participantes: { $sum: { $size: "$participantes" } } 
            }
        },
        {
            $sort: { _id: 1 }
        }
    ];

    const collection = db.collection("eventos"); 
    const result = await collection.aggregate(pipeline).toArray();
    console.table(result)

};

