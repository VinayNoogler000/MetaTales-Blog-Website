import './App.css'
import config from "./config"

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  console.log(config.appwriteUrl);

  return (
    <>
      <h1>MetaTales</h1>
    </>
  )
}

export default App
