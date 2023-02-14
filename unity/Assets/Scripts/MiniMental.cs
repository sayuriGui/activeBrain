using System;
using System.Collections.Generic;
using Seccion;
using Pregunta;

namespace Pruebas
{
    public class Pruebas
    {
        static public Dictionary<Seccion.Tipo, List<Pregunta.Pregunta>> mini_mental =
            new Dictionary<Tipo, List<Pregunta.Pregunta>>()
            {
                {
                    Seccion.Tipo.Orientacion,
                    new List<Pregunta.Pregunta>()
                    {
                        new Pregunta.Pregunta(
                            texto: "¿Qué fecha es hoy? (Día, mes y año)",
                            calMax: 3,
                            escolaridad: Pregunta.Escolaridad.Ambas,
                            consideraciones: "Se permite: 1 día al cambiar el mes o el año, 1 mes cuando hay cambio de mes, durante el primer día del mes siguiente y se permite una diferencia de 1 año en los primeros 7 días de ocurrido el cambio de año."
                        ),
                        new Pregunta.Pregunta(
                            texto: "¿Qué día de la semana es?",
                            calMax: 1,
                            escolaridad: Pregunta.Escolaridad.Ambas
                        ),
                        new Pregunta.Pregunta(
                            texto: "¿Qué hora es?",
                            calMax: 1,
                            escolaridad: Pregunta.Escolaridad.Ambas,
                            consideraciones: "Se permite: una diferencia de 1 hora con respecto a la hora en la que se está entrevistando al paciente."
                        ),
                        new Pregunta.Pregunta(
                            texto: "¿En dónde estamos ahora?",
                            calMax: 1,
                            escolaridad: Pregunta.Escolaridad.Ambas
                        ),
                        new Pregunta.Pregunta(
                            texto: "¿En qué piso o departamento estamos?",
                            calMax: 1,
                            escolaridad: Pregunta.Escolaridad.Ambas,
                            consideraciones: "Identifica correctamente el nivel del edificio en dónde se está realizando la entrevista o bien identifica el número de casa o de departamento."
                        ),
                        new Pregunta.Pregunta(
                            texto: "¿Qué colonia es esta?",
                            calMax: 1,
                            escolaridad: Pregunta.Escolaridad.Ambas,
                            consideraciones: "Si los individuos son entrevistados fuera de su domicilio y se les puede pedir identificar el sector o área de la ciudad en dónde se está llevando a cabo la entrevista. "
                        ),
                        new Pregunta.Pregunta(
                            texto: "¿Qué ciudad es esta?",
                            calMax: 1,
                            escolaridad: Pregunta.Escolaridad.Ambas
                        ),
                        new Pregunta.Pregunta(
                            texto: "¿Qué país es este?",
                            calMax: 1,
                            escolaridad: Pregunta.Escolaridad.Ambas
                        ),
                    }
                },
                {
                    Seccion.Tipo.Registro,
                    new List<Pregunta.Pregunta>()
                    {
                        new Pregunta.Pregunta( //? Creo que estos se deben mencionar a fuerzas verbalmente
                            texto: "¿Repita estos 3 objetos? PAPEL, BICICLETA CUCHARA",
                            calMax: 3,
                            escolaridad: Pregunta.Escolaridad.Ambas,
                            consideraciones: "Se califica el primer intento, sin embargo, se le deberán repetir hasta que el paciente logre pronunciar todas las palabras, con un máximo de tres repeticiones. Si no logra repetir los tres objetos, deberá de continuarse con la prueba."
                        ),
                    }
                },
                {
                    Seccion.Tipo.Atencion,
                    new List<Pregunta.Pregunta>()
                    {
                        new Pregunta.Pregunta(
                            texto: "Le voy a pedir que reste de 7 en 7 a partir de 100. (93, 86, 79, 72, 65)",
                            calMax: 5,
                            escolaridad: Pregunta.Escolaridad.Mayor,
                            consideraciones: "Si la persona contesta en forma incorrecta se calificará con 0, y se le dará la respuesta correcta para posteriormente pedirle que continúe, pero de ninguna manera se tendrá que repetir la instrucción"
                        ),
                    }
                },
                {
                    Seccion.Tipo.Lenguaje,
                    new List<Pregunta.Pregunta>()
                    {
                        new Pregunta.Pregunta( //? Igualmente creo  que esta debe ser realizada con un papel real
                            texto: "Le voy a dar algunas instrucciones. Por favor sígalas en el orden en que se las voy a decir. Tome este papel con su mano derecha, dóblela por la mitad y colóquela en el piso",
                            calMax: 3,
                            escolaridad: Pregunta.Escolaridad.Ambas
                        ),
                        new Pregunta.Pregunta( 
                            texto: "Por favor haga lo que dice aquí.",
                            calMax: 1,
                            escolaridad: Pregunta.Escolaridad.Mayor,
                            prefabPath:"Cierre_Los_Ojos"
                        ),
                        new Pregunta.Pregunta( //? Maybe que la escriba con teclado o con dibujo
                            texto: "Quiero que por favor escriba una frase que diga un mensaje ",
                            calMax: 1,
                            escolaridad: Pregunta.Escolaridad.Mayor,
                            consideraciones: "La pregunta se considera positiva cuando la frese contiene verbo, sujeto y sustantivo"
                        ),
                    }
                },
                {
                    Seccion.Tipo.Memoria_Diferida,
                    new List<Pregunta.Pregunta>()
                    {
                        new Pregunta.Pregunta(
                            texto: "Dígame los 3 objetos que le mencioné al principio",
                            calMax: 3,
                            escolaridad: Pregunta.Escolaridad.Ambas
                        ),
                    }
                },
                {
                    Seccion.Tipo.Viso,
                    new List<Pregunta.Pregunta>()
                    {
                        new Pregunta.Pregunta(
                            texto: "Copie el dibujo tal como está.",
                            calMax: 1,
                            escolaridad: Pregunta.Escolaridad.Mayor,
                            persona: Persona.Adulto_Mayor,
                            prefabPath: "Holder_Pentagonos"
                            // consideraciones: "La respuesta se considera como correcta cuando la figura está conformada por dos pentagonosy que dos de sus ángulos sean interceptados."
                        ),
                    }
                },
                {
                    Seccion.Tipo.Memoria_Semantica,
                    new List<Pregunta.Pregunta>()
                    {
                        new Pregunta.Pregunta( //? Creo que en estas si podemos mostrar una imagen del reloj y lapiz
                            texto: "¿Qué es esto? ¿Para qué es esto? ",
                            calMax: 2,
                            escolaridad: Pregunta.Escolaridad.Ambas,
                            prefabPath:"Holder_Reloj_Lapiz"
                        ),
                    }
                },
                {
                    Seccion.Tipo.Lenguaje_Repeticion,
                    new List<Pregunta.Pregunta>()
                    {
                        new Pregunta.Pregunta(
                            texto: "Ahora le voy a decir una frase que tendrá que repetir después de mí. Solo se la puedo decir 1 sola vez, así que ponga mucha atención: “Ni no, ni si, ni pero”",
                            calMax: 1,
                            escolaridad: Pregunta.Escolaridad.Ambas
                        ),
                    }
                },
            };
    }
}
