show tables;
SELECT* FROM empleado;
SELECT codigo_departamento from empleado;
SELECT distinct codigo FROM empleado;
SELECT nombre,apellido1 FROM empleado;
SELECT concat(nombre,'  ',apellido1)FROM empleado;
SELECT concat(upper(nombre),'  ',upper(apellido1),'  ',upper(apellido2))AS nombreApellidos FROM empleado;
SELECT CONCAT(LOWER(nombre),'   ',LOWER(apellido1))AS nombreApellido FROM empleado;
SELECT CONCAT(right(nif ,1),'  ',left(nif,LENGTH(nif)-1))AS nifSeparado FROM empleado;
SELECT nombre ,presupuesto,gasto ,(presupuesto-gasto) AS preupuestoActual from departamento;
SELECT* FROM departamento ORDER BY nombre;
SELECT* FROM departamento ORDER BY nombre asc;
SELECT* FROM departamento ORDER BY nombre desc;
SELECT* from empleado order by apellido1 desc,nombre desc;
select nombre, presupuesto from departamento order by presupuesto desc limit 3;
select nombre, presupuesto from departamento order by presupuesto asc limit 3;
select nombre,gasto from departamento order by gasto asc limit 3;
select nombre, gasto from departamento order by gasto desc limit 3;
SELECT nombre,presupuesto from departamento where presupuesto >=150000 order by presupuesto asc;
SELECT nombre ,gasto from departamento where gasto<5000 order by gasto desc; 
SELECT nombre ,presupuesto from departamento where presupuesto>100000 and presupuesto<200000 order by presupuesto asc;
SELECT nombre ,presupuesto from departamento where presupuesto<=100000 and presupuesto>=200000 order by presupuesto asc;
SELECT nombre,presupuesto from departamento where presupuesto BETWEEN 100000 AND 200000;
SELECT nombre ,gasto ,presupuesto FROM departamento WHERE gasto>presupuesto;
SELECT*FROM empleado WHERE apellido2 IS null;
SELECT*FROM empleado WHERE apellido2 IS NOT null;
SELECT*FROM empleado WHERE apellido2 ="lopez";
SELECT*FROM empleado WHERE apellido2="Dias"or apellido2="moreno";
SELECT*FROM empleado WHERE apellido2 IN ("moreno","lopez");
SELECT nombre,apellido1,apellido2,nif FROM empleado WHERE codigo_departamento=3;
SELECT nombre, apellido1,apellido2,nif FROM empleado WHERE codigo_departamento=2 or codigo_departamento=4 or codigo_departamento=5;
SELECT *FROM empleado e inner join departamento d where e.codigo_departamento=d.codigo;
SELECT* FROM empleado e inner join departamento d where e.codigo_departamento=d.codigo order by e.apellido1 asc,e.apellido2 asc,d.nombre asc;
SELECT distinct d.codigo,d.nombre FROM departamento d inner join empleado e on d.codigo=e.codigo_departamento;
SELECT distinct  d.codigo, d.nombre ,d.presupuesto-d.gasto as presupuestoActual
FROM departamento d inner join empleado e on d.codigo=e.codigo_departamento;

SELECT d.nombre FROM departamento d inner join 
empleado e 
on d.codigo=e.codigo_departamento
WHERE e.nif='38382980M';

SELECT d.nombre FROM departamento d inner join
empleado e 
on d.codigo=e.codigo_departamento
WHERE e.apellido2='santana';

SELECT e.nombre FROM empleado e inner join
departamento d 
on e.codigo_departamento= d.codigo
WHERE  d.nombre='I+D' ORDER BY e.nombre;

SELECT e.nombre FROM empleado e inner join 
departamento d on e.codigo_departamento=d.codigo
WHERE d.presupuesto<=100000 or d.presupuesto>=200000 order by e.nombre;

SELECT e.nombre FROM empleado e INNER JOIN  
departamento d on e.codigo_departamento=d.codigo
WHERE 	d.presupuesto not BETWEEN 100000 AND 200000 order by e.nombre;

SELECT d.nombre FROM departamento d INNER JOIN 
empleado e ON d.codigo=e.codigo_departamento
WHERE e.apellido2 IS NULL;

SELECT* FROM empleado e LEFT JOIN
departamento d ON e.codigo_departamento=d.codigo;

SELECT* FROM empleado e LEFT JOIN 
departamento d ON e.codigo_departamento=d.codigo
WHERE d.codigo is null;

SELECT* FROM departamento d LEFT JOIN 
empleado e on d.codigo=e.codigo_departamento
WHERE e.codigo_departamento is null;

SELECT *  FROM empleado e LEFT JOIN 
departamento d ON e.codigo_departamento=d.codigo
UNION 
SELECT * FROM departamento d RIGHT JOIN 
empleado e on d.codigo=e.codigo_departamento
ORDER BY 
d.nombre;


