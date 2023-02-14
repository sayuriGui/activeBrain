namespace Pregunta
{
    public enum Escolaridad
    {
        Menor, // Escolaridad Menor o Igual a 3 años
        Mayor, // Escolaridad Mayor a 3 años

        Ambas, // Sí la pregunta se realiza para ambas ecolaridades
    }

    // Quien debe de tener la tablet en la mano a la hora de contestar? Aplicador o Adulto Mayor
    public enum Persona
    {
        Aplicador,
        Adulto_Mayor
    }

    public class Pregunta
    {
        public string texto; // Representa el texto a desplegar de la pregunta

        public int calMax{get;} // Representa la calificación máxima de la pregunta

        public int cal { get; set; } // Representa la califación de la pregunta

        public Escolaridad escolaridad; // Representa la escolaridad

        public string prefabPath {get;} // Path a un cierto prefab necesario para la pregunta  Ej. Una Foto

       public string consideraciones {get;} // Representa consideraciones extras que se deben tener a la hora de calificar la pregunta

        public Persona persona {get;} // Quien tiene la tablet en la mano

        public Pregunta(
            string texto,
            int calMax,
            Escolaridad escolaridad = Escolaridad.Ambas,
            string prefabPath = null,
            string consideraciones = null,
            Persona persona = Persona.Aplicador
        )
        {
            this.texto = texto;
            this.calMax = calMax;
            this.escolaridad = escolaridad;
            this.cal = 0;
            this.prefabPath = prefabPath;
            this.consideraciones = consideraciones;
            this.persona = persona;
        }
    }
}
