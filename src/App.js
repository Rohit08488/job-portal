import "./App.css";
import Layout from "./Layout";
import Header from "./Componet/Header";
import Bottom from "./Componet/Footer";
import { AuthProvider } from "./contexts/AuthContext";
function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <Layout />
        <Bottom />
      </AuthProvider>
    </div> 
  );
}

export default App;
