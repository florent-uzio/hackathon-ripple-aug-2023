import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./app-layouts"
import { AuthProvider } from "./shared/contexts"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
