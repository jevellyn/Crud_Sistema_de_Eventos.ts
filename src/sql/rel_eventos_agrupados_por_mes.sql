SELECT 
    MONTH(DATA_EVENTO) AS mes,
    COUNT(EVENTO_ID) AS total_eventos
FROM 
    SYS_EVENTO.EVENTOS
GROUP BY 
    MONTH(DATA_EVENTO)
ORDER BY 
    MONTH(DATA_EVENTO);

