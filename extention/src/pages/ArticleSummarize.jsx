import React from 'react'
import { useEffect, useState } from 'react'
import {
    Text,
    Button,
    Flex,
    Space,
    TextInput,
    Avatar,
    Group,
    Textarea,
    CopyButton,
} from '@mantine/core'
import { Link, ArrowRight, Spark } from 'iconoir-react'
import { summarizeArticle } from './../utils/api'

const ArticleSummarize = () => {
    const [articleLink, setArticleLink] = useState(null)
    const [inputErr, setinputErr] = useState(false)

    ///////

    const [SummarizedText, setSummarizedText] = useState(null)
    const [loading, setloading] = useState(false)

    const checkCurrentTab = () => {
        // Query the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs.length > 0 && tabs[0].url) {
                const url = tabs[0].url

                if (url) {
                    setArticleLink(url)
                }
            }
        })
    }

    useEffect(() => {
        checkCurrentTab()
    }, [])

    const handleSummarizeClick = async () => {
        setloading(true)
        setinputErr(false)
        if (!articleLink) {
            setinputErr(true)
            setloading(false)
            return
        } else {
            try {
                const data = await summarizeArticle(articleLink)
                if (data && data.text) {
                    setSummarizedText(data.text)
                } else {
                    setSummarizedText('Summary not available.')
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
            <TextInput
                icon={<Link color="gray" height={20} width={20} />}
                placeholder="Article Link"
                radius="xl"
                size="md"
                value={articleLink}
                ta="left"
                onChange={(event) => setArticleLink(event.currentTarget.value)}
                error={inputErr ? 'Please enter a valid article link' : false}
            />
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
                {loading ? 'Summarizing...' : 'Summarize'}
            </Button>

            {SummarizedText ? (
                <>
                    <Textarea
                        w="100%"
                        placeholder="Article summary"
                        label="Article summary"
                        minRows={10}
                        maxRows={14}
                        value={SummarizedText}
                    >
                        {' '}
                    </Textarea>
                    <Space h="xl" />
                    <CopyButton value={SummarizedText}>
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

export default ArticleSummarize
