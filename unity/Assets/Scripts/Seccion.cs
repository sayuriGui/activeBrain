using System;
using System.Collections.Generic;
using Pregunta;
using static Pruebas.Pruebas;

namespace Seccion
{
    public enum Tipo
    {
        Orientacion,
        Registro, // Registro, memoria inmediata

        Atencion, // Atención y cálculo
        Lenguaje,
        Memoria_Diferida, // Memoria diferida,
        Viso, // Viso / Espacial
        Memoria_Semantica, // Memoria  Semántica
        Lenguaje_Repeticion, // Lenguaje y Repetición
    }

    public class Seccion
    {
        public Tipo categoria; // Representa la categoria de la pregunta
        public int total
        {
            get
            {
                int sum = 0;
                foreach (var p in preguntas)
                {
                    sum += p.cal;
                }

                return sum;
            }
        } // Representa la calificación total de la sección


        

        public List<Pregunta.Pregunta> preguntas;

        public override string  ToString(){
           
           return categoria.ToString() + ": " + total.ToString();


        }


        public Seccion(Tipo tipo)
        {
            categoria = tipo;
            preguntas = mini_mental[tipo];
        }
    }
}
