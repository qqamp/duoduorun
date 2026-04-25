import { AppProvider } from './context/AppContext'
import TopToolbar from './components/TopToolbar'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

function App() {
  return (
    <AppProvider>
      <div className="h-screen flex flex-col">
        <TopToolbar />
        <div className="flex-1 flex min-h-0">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </AppProvider>
  )
}

export default App
