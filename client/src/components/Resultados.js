import Card from "../components/UI/Card";
function Resultados({ resultados, className }) {
  return (
    <div className={className}>
      <Card>
        <h1>Resultados:</h1>
        <hr />
        <h2>Orientación</h2>
        <h3>{resultados.orientacion} / 10 pts</h3>
        <h2>Registro, memoria inmediata</h2>
        <h3>{resultados.memoriaInmediata} / 3 pts</h3>
        <h2>Atención y cálculo</h2>
        <h3>{resultados.atencionCalculo} / 5 pts</h3>
        <h2>Lenguaje</h2>
        <h3>{resultados.lenguaje} / 5 pts</h3>
        <h2>Memoria diferida</h2>
        <h3>{resultados.memoriaDiferida} / 3 pts</h3>
        <h2>Viso / espacial</h2>
        <h3>{resultados.visoEspacial} / 1 pts</h3>
        <h2>Memoria semántica</h2>
        <h3>{resultados.memoriaSemantica} / 2 pts</h3>
        <h2>Lenguaje y repetición</h2>
        <h3>{resultados.lenguajeRepeticion} / 1 pts</h3>
        <hr />
        <h2>Total</h2>
        <h3>{resultados.total}</h3>
      </Card>
    </div>
  );
}

export default Resultados;
