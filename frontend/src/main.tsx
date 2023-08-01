import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./app-layouts"
import { AuthProvider, Web3Provider } from "./shared/contexts"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3Provider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Web3Provider>
  </React.StrictMode>,
)
