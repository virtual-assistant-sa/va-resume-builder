import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'

const Resume = () => {
    const photoRef = useRef(null)
    const [width, setWidth] = useState(null)
    const [educationData, setEducationData] = useState([])
    const [experience, setExperience] = useState([])
    const [skills, setSkills] = useState([])

    useEffect(() => {
        setWidth(photoRef.current?.style.height)
        initializeData()
    }, [])

    const initializeData = () => {
        const educationDataList = [
            {
                start: "2020",
                end: "2021",
                where: "someplace",
                what: "I worked as a thing"
            },
            {
                start: "2022",
                end: "Current",
                where: "someplace2",
                what: "I worked as a thing2"
            },
        ]
        setEducationData(educationDataList)

        const workExperiences = [
            {
                start: "2020",
                end: '2021',
                where: {
                    business: "AVECS",
                    country: "SA"
                },
                responsibilities: [
                    "cat",
                    "car2",
                    "car2",
                    "car2",
                    "car2",
                    "car2",
                    "car2",
                ]
            },
            {
                start: "2020",
                end: '2021',
                where: {
                    business: "AVECS",
                    country: "SA"
                },
                responsibilities: [
                    "cat",
                    "car2",
                    "car2",
                    "car2",
                    "car2",
                    "car2",
                    "car2",
                ]
            }
        ]
        
        setExperience(workExperiences)
        const skillsAPI = [
            "Skill 1",
            "Skill 2",
            "Skill 3"
        ]
        setSkills(skillsAPI)
    }
    const PhotoContainer = () => {
        return (
            <PhotoContainerWrapper ref={photoRef} heigth={width}>
                <PhotoSize />
            </PhotoContainerWrapper>
        )
    }

    const HeadlineWithParagraph = ({headline, paragraph}) => {
        return(
            <>
                <H2 light>{headline}</H2>
                <P light>{paragraph}</P>
            </>
        )
    }
    const HeadlineWithGroupedLists = ({headline, data}) => {
        return(
            <>
                <H2 light>{headline}</H2>
                {
                    data?
                    data.map((item, i) => {
                        return(
                            <div key={i}>
                                <Text light>{item.start} - {item.end}</Text>
                                <Text light>{item.where}</Text>
                                <Text light>{item.what}</Text>
                                {
                                    i===data.length -1?
                                    null
                                    :<Spacer/>
                                }
                            </div>
                        )
                    })
                    :null
                }
                
            </>
        )
    }
    const HeadlineWithList = ({headline, list}) => {
        return(
            <>
                <H2 light>{headline}</H2>
                {
                    list?
                    list.map((item, i) => {
                        return(
                            <Text key={i} light>{item}</Text>
                        )
                    })
                    :null
                }
                
            </>
        )
    }
    const WorkExperienceBlock = ({data}) => {
        return(
            <>
            {
                data?
                <>
                    <Text>{data.start} - {data.end}</Text>
                    <Text>{data.where.business} | {data.where.country}</Text>
                    <ul>
                    {
                        data.responsibilities?
                        data.responsibilities.map((responsibility, i) => {
                            return(
                                <li key={i}>{responsibility}</li>
                            )
                        })
                        :null
                    }
                    </ul>
                </>
                :null

            }
                
            </>
           
        )
    }
    return (
        <Container>
            <LeftContainer>
                <PaddedContainer>
                    <PhotoContainer>PhotoContainer</PhotoContainer>
                    
                    <Spacer/>
                    <HeadlineWithParagraph 
                        headline={"Profile"}
                        paragraph={"I am a highly organized and detail-oriented individual with experience in providing online assistance to individuals and organizations. I am well-versed in various tasks such as scheduling appointments, managing emails, conducting research, and providing customer support. My strong communication skills and ability to understand client's needs have allowed me to excel in my previous roles as an online assistant. I am a quick learner, adaptable, and able to work well under pressure. I am comfortable with modern technologies and softwares that are commonly used for virtual assistance."}
                        />
                    <Spacer/>
                    <HeadlineWithGroupedLists headline={"Education"} data={educationData}/>
                    <Spacer/>
                    <HeadlineWithList headline={"Hobbies"} list={["Hobby 1", "Hobby 2"]}/>
               
                </PaddedContainer>
                
            </LeftContainer>
            <ContentContainer>
                <H1>SIMONE</H1>
                <Separator/>
                <H2>Virtual Ass</H2>
                <Spacer/>
                <H3>Work Experience</H3>
                {
                    experience.map((data, i) => {
                        return(
                            <WorkExperienceBlock key={i} data={data}/>
                        )
                    })
                }
                <Spacer/>
                <H3>Skills</H3>
                {
                    skills?
                    skills.map((skill, i) => {
                        return(
                            <div key={i}>{skill}</div>
                        )
                    })
                    :null
                }
            </ContentContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height:100%;
    position: relative;
    display: flex;
    max-width: 1000px;
    margin: auto;
    box-shadow: 0 0 5px grey;
`
const Separator = styled.div`
    border: 1px solid rgba(0,0,0, 0.9);
    width: 50px;
`
const LeftContainer = styled.div`
    width: 400px;
    height: 100%;
    background-color: pink;
`
const PhotoContainerWrapper = styled.div`
    width: 100%;
    position: relative;
    background-color: rgba(255,255,255,0.1);
    border-radius: 50%;
    margin: 0 auto;
`
const PhotoSize = styled.div`
    width: 100%;
    padding-top: 100%;
`
const Spacer = styled.div`
    height: 40px;
    width: 100%;
`
const H2 = styled.h2`
    color: ${props => props.light? 'rgba(255,255,255,0.8)':'rgba(0,0,0, 0.9)'};
`
const PaddedContainer = styled.div`
    padding: 40px;
    background-color: #4a596d;
`
const P = styled.p`
    color: ${props => props.light? 'rgba(255,255,255,0.8)':'rgba(0,0,0, 0.9)'};
`
const Text = styled.div`
    color: ${props => props.light? 'rgba(255,255,255,0.8)':'rgba(0,0,0, 0.9)'};
`
const ContentContainer = styled.div`
    height:100%;
    width: 100%;
    padding-left: 40px;
    padding-right:40px;
    padding-top: 40px;
`
const H1 = styled.h1`
    margin: 0;
    color: ${props => props.light? 'rgba(255,255,255,0.8)':'rgba(0,0,0, 0.9)'};
`
const H3 = styled.h3`
    margin: 0;
    color: ${props => props.light? 'rgba(255,255,255,0.8)':'rgba(0,0,0, 0.9)'};
`
export default Resume
