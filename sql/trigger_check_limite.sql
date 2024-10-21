CREATE TRIGGER check_limite
BEFORE INSERT ON participante_evento
FOR EACH ROW
BEGIN
  DECLARE total_participantes int;
  DECLARE limite_evento int;

 
  SELECT COUNT(*) 
  INTO total_participantes
  FROM participante_evento
  WHERE EVENTO_ID = NEW.EVENTO_ID;

  
  SELECT LIMITE_PARTICIPANTES 
  INTO limite_evento
  FROM EVENTOS
  WHERE EVENTO_ID = NEW.EVENTO_ID;

  IF total_participantes >= limite_evento THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Não é possível inserir novo participante. Capacidade do evento atingida';
  END IF;
END