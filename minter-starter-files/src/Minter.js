import { useEffect, useState } from "react";
import { connectWallet,
         getCurrentWalletConnected,
         mintNFT 
} from "./utils/interact.js";

const Minter = (props) => {

  //State variables . Son variables del tipo statehooks que maneja React
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
 
  // llamado después de que su componente sea renderizado, solo en el primer render
  useEffect(async () => {
    // Verificamos si nuestra app ya está conectada a Metamask
    // Si estamos conectados nos va a devovler nuestra address y status
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);

    // Nos quedamos escuchando el evento de metamask que nos informa cambios en la wallet.
    addWalletListener();
  }, []);

  // llamado cuando queremos conectar la wallet a metamask
  const connectWalletPressed = async () => { 
    const walletResponse = await connectWallet(); // llamamos a nuestra clase que se conecta con metamask
    setStatus(walletResponse.status); //Guardo el valor de status devuelto por Metamask
    setWallet(walletResponse.address); //Guardo el valor de address devuelto por Metamask
  };

  // llamado cuando desde el front hacen click en el botón de Mint NFT
  const onMintPressed = async () => {
    // Llamamos a nuestra función que hace el mint y lo impacta en el contrato.
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
  };

  // Función para escuchar el evento de Metamask que se dispara
  //  cuando hay algún cambio en la wallet o cuenta.
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Minter;
