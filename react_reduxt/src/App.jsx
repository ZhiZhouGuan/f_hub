import { useState } from 'react'
import { HashRouter } from "react-router-dom";
import Router from "@/router";
import './App.scss'
import 'antd/dist/antd.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
			{/* <ConfigProvider locale={i18nLocale} componentSize={assemblySize}> */}
				{/* <AuthRouter> */}
					<Router />
				{/* </AuthRouter> */}
			{/* </ConfigProvider> */}
		</HashRouter>
  )
}

export default App
