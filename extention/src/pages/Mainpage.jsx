import {
    YouTube,
    Mail,
    Spark,
    ArrowLeft,
    TextAlt,
    TextBox,
} from 'iconoir-react'
import reactLogo from './../assets/wizard.svg'
import { Button, Flex, Space } from '@mantine/core'
import { useState } from 'react'
import Youtubeai from './Youtubeai'
import ArticleSummarize from './ArticleSummarize'
import EmailRep from './EmailRep'
import TextSummarize from './TextSummarize'
import ExplainSomething from './ExplainSomething'
const Mainpage = () => {
    const [currentTab, setCurrentTab] = useState('nono')
    const NavigatonHead = ({ children }) => (
        <>
            <div className="headerNav">
                <Button
                    variant="subtle"
                    radius="xl"
                    size="md"
                    leftIcon={<ArrowLeft color="gray" height={20} width={20} />}
                    onClick={() => setCurrentTab('nono')}
                    color="gray"
                >
                    Back to Home
                </Button>
            </div>
            {children}
        </>
    )

    const youtubeClick = () => {
        setCurrentTab('youtube')
    }

    const articlesummrize = () => {
        setCurrentTab('articlrsummrize')
    }

    const emailrep = () => {
        setCurrentTab('emailrep')
    }
    const Textsumm = () => {
        setCurrentTab('Textsumm')
    }
    const TextExplain = () => {
        setCurrentTab('TextExplain')
    }
    if (currentTab === 'youtube') {
        return (
            <NavigatonHead>
                <Youtubeai setCurrent={() => setCurrentTab('nono')} />{' '}
            </NavigatonHead>
        )
    }
    if (currentTab === 'articlrsummrize') {
        return (
            <NavigatonHead>
                <ArticleSummarize />
            </NavigatonHead>
        )
    }

    if (currentTab === 'emailrep') {
        return (
            <NavigatonHead>
                <EmailRep />
            </NavigatonHead>
        )
    }

    if (currentTab === 'Textsumm') {
        return (
            <NavigatonHead>
                <TextSummarize />
            </NavigatonHead>
        )
    }

    if (currentTab === 'TextExplain') {
        return (
            <NavigatonHead>
                <ExplainSomething />
            </NavigatonHead>
        )
    }

    if (currentTab === null) {
        setCurrentTab('nono')
    }

    return (
        <Flex
            mih={50}
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
        >
            <img src={reactLogo} className="App-logo" alt="logo" />
            <Space h="xl" />

            <Button
                radius="xl"
                size="md"
                leftIcon={<YouTube color="white" height={20} width={20} />}
                color="red"
                fullWidth
                onClick={() => youtubeClick()}
            >
                Summarize Youtube video
            </Button>

            <Button
                radius="xl"
                size="md"
                leftIcon={<Spark color="white" height={20} width={20} />}
                color="violet"
                fullWidth
                onClick={() => articlesummrize()}
            >
                Summarize Article
            </Button>

            <Button
                radius="xl"
                size="md"
                leftIcon={<Mail color="white" height={20} width={20} />}
                color="orange"
                fullWidth
                onClick={() => emailrep()}
            >
                Email reply
            </Button>
            <Button
                radius="xl"
                size="md"
                leftIcon={<TextAlt color="white" height={20} width={20} />}
                color="green"
                fullWidth
                onClick={() => Textsumm()}
            >
                text summarizer
            </Button>
            <Button
                radius="xl"
                size="md"
                leftIcon={<TextBox color="white" height={20} width={20} />}
                color="indigo"
                fullWidth
                onClick={() => TextExplain()}
            >
                Explain text
            </Button>
        </Flex>
    )
}

export default Mainpage
