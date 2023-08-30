import { useState } from 'react'
import reactLogo from './assets/wizard.svg'
import { MantineProvider, Text, Button, Flex, Space } from '@mantine/core'
import { Google, YouTube, Mail, Spark } from 'iconoir-react'

import './App.css'
import Mainpage from './pages/Mainpage'

function App() {
    const [count, setCount] = useState(0)

    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Mainpage className="mainbtns" />
            <div className="Powered">
                <p>
                    Powered by <span>MindsDB</span>{' '}
                </p>
            </div>
        </MantineProvider>
    )
}

export default App
