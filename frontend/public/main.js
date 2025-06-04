import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

const App = () => {
  const [libraries, setLibraries] = React.useState([]);

  React.useEffect(() => {
    fetch("http://backend:4000/library")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Réponse réseau incorrecte");
        }
        return res.json();
      })
      .then((data) => {
        setLibraries(data);
      })
      .catch((err) => console.error("Erreur chargement bibliothèque:", err));
  }, []);

  return (
    <div className="container">
      {libraries.length === 0 ? (
        <p>Chargement des bibliothèques Plex...</p>
      ) : (
        libraries.map((library) => (
          <div key={library.key} className="section">
            <h2>{library.title}</h2>
            <div className="media-grid">
              {library.items.map((item) => (
                <div key={item.ratingKey} className="card">
                  <img
                    src={`http://<TON_IP_PLEX>:32400${item.thumb}?X-Plex-Token=<TON_TOKEN_PLEX>`}
                    alt={item.title}
                  />
                  <h3>{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
