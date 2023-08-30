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
import { summarizeYoutubeVideo } from './../utils/api'

import getVideoInfo from '../utils/youtubevideoAPI'
import getYouTubeVideoId from '../utils/youtubeVideoid'

const Youtubeai = (props) => {
    const [youtubeLink, setYoutubeLink] = useState(null)
    const [youtubeId, setyoutubeId] = useState(null)
    const [videoInfo, setVideoInfo] = useState(null)
    const [pagestate, setpagestate] = useState('link') // Link, videopage,
    const [inputErr, setinputErr] = useState(false)

    ///////

    const [SummarizedText, setSummarizedText] = useState(null)
    const [loading, setloading] = useState(false)

    const resetVideo = () => {
        setpagestate('link')
        setyoutubeId(null)
        setSummarizedText(null)
        setloading(false)
        setYoutubeLink(null)
    }
    const checkCurrentTab = () => {
        // Query the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs.length > 0 && tabs[0].url) {
                const url = tabs[0].url

                // Regular expression to match YouTube video links
                const youtubeRegex =
                    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([^&/]+).*/

                // Check if the current URL is a YouTube link
                const match = url.match(youtubeRegex)
                if (match) {
                    // Extract the video ID from the URL and set it in state
                    const videoId = match[3]
                    setyoutubeId(videoId)
                    setYoutubeLink(`https://www.youtube.com/watch?v=${videoId}`)
                }
            }
        })
    }

    useEffect(() => {
        checkCurrentTab()
        if (youtubeId) {
            getVideoInfo(youtubeId).then((info) => {
                if (info) {
                    setVideoInfo(info)
                    setpagestate('videopage')
                } else {
                    setinputErr(true)
                }
            })
        }
    }, [youtubeId])

    const handleVideoUrl = () => {
        const id = getYouTubeVideoId(youtubeLink)
        if (id) {
            setyoutubeId(id)
        } else {
            setyoutubeId(youtubeLink)
        }
    }

    const handleSummarizeClick = async () => {
        const url = `https://www.youtube.com/watch?v=${youtubeId}`
        setloading(true)

        try {
            const data = await summarizeYoutubeVideo(url)
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

    if (pagestate === 'videopage') {
        return (
            <>
                <div>
                    <Group noWrap>
                        <Avatar
                            src={videoInfo?.thumbnail}
                            size={120}
                            radius="md"
                            alt={videoInfo?.title}
                        />
                        <div>
                            <Text fz="md" tt="uppercase" fw={500} ta="left">
                                {videoInfo.title}
                            </Text>
                        </div>
                    </Group>
                    <Space h="xl" />

                    <Flex
                        mih={50}
                        gap="md"
                        justify="flex-start"
                        align="flex-start"
                        direction="column"
                        wrap="nowrap"
                    >
                        <Button
                            radius="xl"
                            size="md"
                            leftIcon={
                                <Spark color="white" height={20} width={20} />
                            }
                            color="violet"
                            fullWidth
                            loading={loading}
                            onClick={handleSummarizeClick}
                        >
                            {loading ? 'Summarizing...' : 'Summarize Video'}
                        </Button>
                        {/* <Button
              variant="default"
              color="dark"
              radius="xl"
              size="md"
              fullWidth
              onClick={resetVideo}
            >
              Another video
            </Button> */}
                        {SummarizedText ? (
                            <>
                                <Textarea
                                    w="100%"
                                    placeholder="Your comment"
                                    label="Video summary"
                                    minRows={10}
                                    maxRows={14}
                                    value={SummarizedText}
                                >
                                    {' '}
                                </Textarea>
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
                    </Flex>
                </div>
            </>
        )
    }

    if (pagestate === 'link') {
        return (
            <>
                <TextInput
                    icon={<Link color="gray" height={20} width={20} />}
                    placeholder="ٌYoutube Video Link"
                    radius="xl"
                    size="md"
                    value={youtubeLink}
                    ta="left"
                    onChange={(event) =>
                        setYoutubeLink(event.currentTarget.value)
                    }
                    error={
                        inputErr ? 'Please enter a valid youtube link' : false
                    }
                />
                <Space h="xl" />

                <Button
                    radius="xl"
                    size="md"
                    rightIcon={
                        <ArrowRight color="white" height={20} width={20} />
                    }
                    color="red"
                    fullWidth
                    onClick={handleVideoUrl}
                >
                    Next
                </Button>
            </>
        )
    }
}

export default Youtubeai
