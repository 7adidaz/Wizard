import { useState } from 'react'
import { Text, Button, Space, Textarea, CopyButton } from '@mantine/core'
import { Spark } from 'iconoir-react'
import { textsummarizeapi } from './../utils/api'

const TextSummarize = () => {
    const [textbody, settextbody] = useState(null)
    const [inputErr, setinputErr] = useState(false)

    ///////

    const [textSummarize, settextSummarize] = useState(null)
    const [loading, setloading] = useState(false)

    const handleSummarizeClick = async () => {
        setloading(true)
        setinputErr(false)
        settextSummarize(null)
        if (!textbody) {
            setinputErr(true)
            setloading(false)
            return
        } else {
            try {
                const data = await textsummarizeapi(textbody)
                if (data && data.text) {
                    settextSummarize(data.text)
                } else {
                    settextSummarize('summary not available.')
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
                placeholder="Text to summrize"
                label="Text to summrize"
                minRows={5}
                maxRows={8}
                value={textbody}
                error={inputErr ? 'Please enter a valid text' : false}
                onChange={(event) => settextbody(event.currentTarget.value)}
            ></Textarea>
            <Space h="xl" />

            <Button
                radius="xl"
                size="md"
                leftIcon={<Spark color="white" height={20} width={20} />}
                color="violet"
                fullWidth
                loading={loading}
                onClick={handleSummarizeClick}
            >
                {loading ? 'Loading...' : 'Summarize'}
            </Button>

            {textSummarize ? (
                <>
                    <Textarea
                        w="100%"
                        placeholder="Article summary"
                        label="Article summary"
                        minRows={10}
                        maxRows={14}
                        value={textSummarize}
                    >
                        {' '}
                    </Textarea>
                    <Space h="xl" />
                    <CopyButton value={textSummarize}>
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
                    Summarized Text will appear here
                </Text>
            )}
        </>
    )
}

export default TextSummarize
