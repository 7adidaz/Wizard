import { useState } from 'react'
import { Text, Button, Space, Textarea, CopyButton } from '@mantine/core'
import { Spark } from 'iconoir-react'
import { explainText } from './../utils/api'

const ExplainSomething = () => {
    const [toExplainText, settoExplainText] = useState(null)
    const [inputErr, setinputErr] = useState(false)

    ///////

    const [ExplainSomething, setExplainSomething] = useState(null)
    const [loading, setloading] = useState(false)

    const handleExplainText = async () => {
        setloading(true)
        setinputErr(false)
        setExplainSomething(null)
        if (!toExplainText) {
            setinputErr(true)
            setloading(false)
            return
        } else {
            try {
                const data = await explainText(toExplainText)
                if (data && data.text) {
                    setExplainSomething(data.text)
                } else {
                    setExplainSomething('Explanation not available.')
                }
            } catch (error) {
                console.error('Error:', error)
            } finally {
                setloading(false)
            }
        }
    }

    return (
        <>
            <Textarea
                w="100%"
                placeholder="Text to Explain"
                label="Text to Explain"
                minRows={5}
                maxRows={8}
                value={toExplainText}
                error={inputErr ? 'Please enter a valid text' : false}
                onChange={(event) =>
                    settoExplainText(event.currentTarget.value)
                }
            ></Textarea>
            <Space h="xl" />

            <Button
                radius="xl"
                size="md"
                leftIcon={<Spark color="white" height={20} width={20} />}
                color="violet"
                fullWidth
                loading={loading}
                onClick={handleExplainText}
            >
                {loading ? 'Loading...' : 'Explain'}
            </Button>

            {ExplainSomething ? (
                <>
                    <Textarea
                        w="100%"
                        placeholder="Article summary"
                        label="Article summary"
                        minRows={10}
                        maxRows={14}
                        value={ExplainSomething}
                    >
                        {' '}
                    </Textarea>
                    <Space h="xl" />
                    <CopyButton value={ExplainSomething}>
                        {({ copied, copy }) => (
                            <Button
                                radius="xl"
                                size="md"
                                fullWidth
                                color={copied ? 'violet' : 'blue'}
                                onClick={copy}
                            >
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                        )}
                    </CopyButton>
                </>
            ) : (
                <Text fz="md" tt="uppercase" fw={500} ta="left">
                    Explanation Text will appear here
                </Text>
            )}
        </>
    )
}

export default ExplainSomething
