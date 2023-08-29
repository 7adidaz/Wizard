import { useState } from 'react'
import { Text, Button, Space, Textarea, CopyButton } from '@mantine/core'
import { Spark } from 'iconoir-react'
import { emailReplyapi } from './../utils/api'

const EmailRep = () => {
    const [emailbody, setEmailbody] = useState(null)
    const [inputErr, setinputErr] = useState(false)
    const [name, setname] = useState(null)
    ///////

    const [emailReply, setemailReply] = useState(null)
    const [loading, setloading] = useState(false)

    const handleSummarizeClick = async () => {
        setloading(true)
        setinputErr(false)
        setemailReply(null)
        if (!emailbody) {
            setinputErr(true)
            setloading(false)
            return
        } else {
            try {
                const data = await emailReplyapi(emailbody, name)
                if (data && data.text) {
                    setemailReply(data.text)
                } else {
                    setemailReply('Reply not available.')
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
                placeholder="Name"
                label="Name"
                minRows={1}
                maxRows={2}
                value={name}
                error={inputErr ? 'Please enter a valid name' : false}
                onChange={(event) => setname(event.currentTarget.value)}
            ></Textarea>
            <Textarea
                w="100%"
                placeholder="Email body"
                label="Email body"
                minRows={5}
                maxRows={8}
                value={emailbody}
                error={inputErr ? 'Please enter a valid email' : false}
                onChange={(event) => setEmailbody(event.currentTarget.value)}
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
                {loading ? 'Loading...' : 'Reply'}
            </Button>

            {emailReply ? (
                <>
                    <Textarea
                        w="100%"
                        placeholder="Article summary"
                        label="Article summary"
                        minRows={10}
                        maxRows={14}
                        value={emailReply}
                    >
                        {' '}
                    </Textarea>
                    <Space h="xl" />
                    <CopyButton value={emailReply}>
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

export default EmailRep
