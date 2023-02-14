using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Seccion;
using System.Runtime.InteropServices;

public class Manager : MonoBehaviour
{
    public Button[] botones;

    public GameObject buttonGrid;
    public Text header; // Header, texto principal de la pantalla, se usa para mostrar las preguntas

    public Text footer; // Texto de hasta abajo, se utiliza para consideraciones en preguntas

    public GameObject prefabs; // Sección para spawnear prefabs


    private int currentSection = 0; // Representa sección de la prueba actual

    private int currentQuestion = 0; // Representa pregunta dentro de dicha sección

    private Pregunta.Persona ultimaPersona = Pregunta.Persona.Aplicador; // Representa la ultima perssona en tener la aplicación en la mano

    private Pregunta.Escolaridad escolaridad; // Representa la escolaridad del paciente


    // Representa una prueba a realizar, en este caso mini-mental
    List<Seccion.Seccion> prueba = new List<Seccion.Seccion>() {

        new Seccion.Seccion(Seccion.Tipo.Orientacion),
        new Seccion.Seccion(Seccion.Tipo.Registro),
        new Seccion.Seccion(Seccion.Tipo.Atencion),
        new Seccion.Seccion(Seccion.Tipo.Lenguaje),
        new Seccion.Seccion(Seccion.Tipo.Memoria_Diferida),
        new Seccion.Seccion(Seccion.Tipo.Viso),
        new Seccion.Seccion(Seccion.Tipo.Memoria_Semantica),
        new Seccion.Seccion(Seccion.Tipo.Lenguaje_Repeticion)
    };



    private void Start()
    {
        //iniciarTest(2);
    }




    void siguientePregunta()
    {

        if (!buttonGrid.activeSelf)
        {
            buttonGrid.SetActive(true);

        }



        // Destruimos prefabs en caso de spawn
        foreach (Transform child in prefabs.transform)
        {
            GameObject.Destroy(child.gameObject);
        }


        Pregunta.Pregunta pregunta = getCurrentQuestion();

        if (pregunta.escolaridad != Pregunta.Escolaridad.Ambas && escolaridad != pregunta.escolaridad)
        {

            currentQuestion += 1;
            if (currentQuestion - 1 == prueba[currentSection].preguntas.Count - 1)
            {
                currentQuestion = 0;
                currentSection += 1;
            }
            siguientePregunta();
            return;

        }



        if (ultimaPersona == Pregunta.Persona.Adulto_Mayor && pregunta.persona == Pregunta.Persona.Aplicador)
        {
            //Spawn thing

            GameObject popUp = Instantiate(Resources.Load("Cambio_Persona")) as GameObject;
            GameObject canvas = GameObject.Find("Canvas") as GameObject;
            popUp.transform.SetParent(canvas.transform);

            Destroy(popUp, 5);


        }

        ultimaPersona = pregunta.persona;


        header.text = pregunta.texto;



        // Spawneamos botones
        for (int i = 0; i < botones.Length; i++)
        {
            if (i >= pregunta.calMax + 1)
            {
                botones[i].gameObject.SetActive(false);
                continue;
            }


            botones[i].gameObject.SetActive(true);
            botones[i].GetComponentInChildren<Text>().text = i.ToString();
        }

        if (pregunta.prefabPath != null)
        {
            prefabs.SetActive(true);

            var pre = Instantiate(Resources.Load(pregunta.prefabPath)) as GameObject;


            pre.transform.SetParent(prefabs.transform);


        }
        else
        {
            prefabs.SetActive(false);


        }


        if (pregunta.consideraciones != null)
        {
            footer.gameObject.SetActive(true);
            footer.text = pregunta.consideraciones;

        }
        else
        {
            footer.gameObject.SetActive(false);
        }


    }





    void initBotones()
    {
    
        for (int i = 0; i < botones.Length; i++)
        {
            Button boton = botones[i];
            int indexBoton = i;
            boton.onClick.AddListener(() => calificar(indexBoton));

        }

    }

    void calificar(int cal)
    {

        prueba[currentSection].preguntas[currentQuestion].cal = cal;
        currentQuestion += 1;

        if (currentSection == prueba.Count - 1)
        {
            Resultados res = new Resultados(prueba);
            string json = JsonUtility.ToJson(res);
            mostrarResultados();
            GameOver(json);
            return;
        }

        if (currentQuestion - 1 == prueba[currentSection].preguntas.Count - 1)
        {
            currentQuestion = 0;
            currentSection += 1;
        }
        siguientePregunta();

    }

    Pregunta.Pregunta getCurrentQuestion()
    {
        return prueba[currentSection].preguntas[currentQuestion];

    }

    public void iniciarTest(int valor_react)
    {
        if(valor_react>3){
            escolaridad = Pregunta.Escolaridad.Mayor;
        } else {
            escolaridad = Pregunta.Escolaridad.Menor;
        }
        initBotones();
        siguientePregunta();
    }


    #region DllImport
    [DllImport("__Internal")]
    private static extern void GameOver(string resultados);
    #endregion


    void mostrarResultados()
    {
        buttonGrid.SetActive(false);
        footer.gameObject.SetActive(false);
        header.gameObject.SetActive(false);
    }

}

[System.Serializable]

public class Resultados{

    public int orientacion, memoriaInmediata, atencionCalculo, lenguaje, memoriaDiferida, memoriaSemantica, visoEspacial, lenguajeRepeticion;

        
   public Resultados(List<Seccion.Seccion> prueba)
   {

       foreach (var s in prueba)
       {
           switch (s.categoria)
           {
               case Seccion.Tipo.Orientacion:
               orientacion = s.total;
               break;
               case Seccion.Tipo.Registro:
               memoriaInmediata = s.total;
               break;
               case Seccion.Tipo.Atencion:
               atencionCalculo = s.total;
               break;
               case Seccion.Tipo.Lenguaje:
               lenguaje = s.total;
               break;
               case Seccion.Tipo.Memoria_Diferida:
               memoriaDiferida = s.total;
               break;
               case Seccion.Tipo.Memoria_Semantica:
               memoriaSemantica = s.total;
               break;
               case Seccion.Tipo.Viso:
               visoEspacial = s.total;
               break;
               case Seccion.Tipo.Lenguaje_Repeticion:
               lenguajeRepeticion = s.total;
               break;
           }
           
       }
   }
}

