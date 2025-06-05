CREATE OR REPLACE VIEW statistics AS 
SELECT 
	p.id AS plant_id,
    p.name AS plant_name,
    p.species,
    COUNT(w.id) AS watering_count,
    MAX(w.date_watered) AS last_watered_date,
    AVG(w.amount_ml) AS average_amount_ml,
    SUM(w.amount_ml) AS total_watered_ml
FROM
	plants p
LEFT JOIN
	watering_logs w ON p.id = w.plant_id
GROUP BY
	p.id, p.name, p.species