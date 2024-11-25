import { table } from "console";
import { connectToDatabase, db } from "../conexion/connection";

const pipeline = [
    {
        $group: {
            _id: { $month: "$dataEvento" },
            total_eventos: { $count: {} }
        }
    },
    { $sort: { "_id": 1 } },
    {
        $project: {
            mes: "$_id",
            total_eventos: 1,
            _id: 0
        }
    }
];

export const eventosPorMes = async () => {
    const collection = db.collection("eventos"); 
    
    const result = await collection.aggregate(pipeline).toArray();
    console.table(result)
};
