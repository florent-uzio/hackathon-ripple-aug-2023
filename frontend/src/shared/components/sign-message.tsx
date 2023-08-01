import { Card } from "@ripple/design-system"

export const SignMessage = () => {
  const messageToSign = async (message: string) => {
    try {
        if (!window.ethereum)
          setError("Please connect your wallet before signing a message!");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
      // First, lets create an Ethers provider instance so we can interact with MetaMask
        const signer = provider.getSigner();
      // Then, we retrieve our signer from MetaMask
        const signatureHash = await signer.signMessage(message);
      // Generate a unique signature hash from the message we passed in from our form submission and the signer's MetaMask
        const address = await signer.getAddress();
      // Also lets grab our signer's Address 
        return {
          message,
          signatureHash,
          address
        };
      // Finally, we return an object with the message, signature hash, and address
      } catch (err) {
        console.log(err.message);
      }
  }

  const signMessageHandler = async (e) => {
    // Code goes here...
  }

  return (
    <Card>
      <div className="banner-sign">
        <span>Sign Messages</span>
      </div>
      <form
        //Add a pointer to our messageHandler function when a message is submitted
        className="sign-form"
        id="form-submit"
      >
        <div className="form-title-message">
          <span>Message to sign</span>
        </div>
        <textarea
          className="message-input"
          type="text"
          name="message"
          placeholder="Enter a message here..."
        ></textarea>
      </form>
      <div className="alert-div">
        <button className="sign-message-button" form="form-submit" type="submit">
          <span>Sign Message</span>
        </button>
      </div>
    </div>
  )
}
