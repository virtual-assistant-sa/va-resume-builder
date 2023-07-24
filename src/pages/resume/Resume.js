import { Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getYear } from "date-fns";

/**
 * @param {Blob} photo Photo
 * @returns
 */

const Resume = ({
  value: {
    name = "",
    photo = null,
    intro = "",
    educations = [],
    experiences = [],
    hobbies = [],
    skills = [],
  },
}) => {
  const photoRef = useRef(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    setWidth(photoRef.current?.style.height);
  }, []);

  const PhotoContainer = () => {
    return (
      <PhotoContainerWrapper ref={photoRef} heigth={width}>
        <PhotoSize />
      </PhotoContainerWrapper>
    );
  };

  const HeadlineWithParagraph = ({ headline, paragraph }) => {
    return (
      <>
        <H2 light>{headline}</H2>
        <P light>{paragraph}</P>
      </>
    );
  };
  const HeadlineWithGroupedLists = ({ headline, data }) => {
    return (
      <>
        <H2 light>{headline}</H2>
        {data?.map((item, i) => {
          return (
            <div key={i}>
              <Text light>
                {getYear(item.start)} - {getYear(item.end)}
              </Text>
              <Text light>{item.where}</Text>
              <Text light>{item.what}</Text>
              {i === data.length - 1 ? null : <Spacer />}
            </div>
          );
        })}
      </>
    );
  };
  const HeadlineWithList = ({ headline, list }) => {
    return (
      <>
        <H2 light>{headline}</H2>
        {list?.map(({ id, text }, i) => {
          return (
            <Text key={id} light>
              {text}
            </Text>
          );
        })}
      </>
    );
  };
  const WorkExperienceBlock = ({ data }) => {
    return (
      <>
        {data ? (
          <>
            <Text>
              {getYear(data.start)} - {getYear(data.end)}
            </Text>
            <Text>
              {data.where.business} | {data.where.country}
            </Text>
            <ul>
              {data.responsibilities?.map(({ id, text }, i) => {
                return <li key={id}>{text}</li>;
              })}
            </ul>
          </>
        ) : null}
      </>
    );
  };
  return (
    <Paper>
      <Container>
        <LeftContainer>
          <PaddedContainer>
            <PhotoContainer>PhotoContainer</PhotoContainer>

            <Spacer />
            <HeadlineWithParagraph headline={"Profile"} paragraph={intro} />
            <Spacer />
            <HeadlineWithGroupedLists
              headline={"Education"}
              data={educations}
            />
            <Spacer />
            <HeadlineWithList headline={"Hobbies"} list={hobbies} />
          </PaddedContainer>
        </LeftContainer>
        <ContentContainer>
          <H1>{name}</H1>
          <Separator />
          <H2>Virtual Assistant</H2>
          <Spacer />
          <H3>Work Experience</H3>
          {experiences?.map((data, i) => {
            return <WorkExperienceBlock key={i} data={data} />;
          })}
          <Spacer />
          <H3>Skills</H3>
          {skills?.map(({ id, text }, i) => {
            return <div key={i}>{text}</div>;
          })}
        </ContentContainer>
      </Container>
    </Paper>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  max-width: 1000px;
  margin: auto;
  box-shadow: 0 0 5px grey;
  overflow: auto;
`;
const Separator = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.9);
  width: 50px;
`;
const LeftContainer = styled.div`
  width: 400px;
  height: 100%;
  background-color: pink;
`;
const PhotoContainerWrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  margin: 0 auto;
`;
const PhotoSize = styled.div`
  width: 100%;
  padding-top: 100%;
`;
const Spacer = styled.div`
  height: 40px;
  width: 100%;
`;
const H2 = styled.h2`
  color: ${(props) =>
    props.light ? "rgba(255,255,255,0.8)" : "rgba(0,0,0, 0.9)"};
`;
const PaddedContainer = styled.div`
  padding: 40px;
  background-color: #4a596d;
`;
const P = styled.p`
  color: ${(props) =>
    props.light ? "rgba(255,255,255,0.8)" : "rgba(0,0,0, 0.9)"};
`;
const Text = styled.div`
  color: ${(props) =>
    props.light ? "rgba(255,255,255,0.8)" : "rgba(0,0,0, 0.9)"};
`;
const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 40px;
`;
const H1 = styled.h1`
  margin: 0;
  color: ${(props) =>
    props.light ? "rgba(255,255,255,0.8)" : "rgba(0,0,0, 0.9)"};
`;
const H3 = styled.h3`
  margin: 0;
  color: ${(props) =>
    props.light ? "rgba(255,255,255,0.8)" : "rgba(0,0,0, 0.9)"};
`;
export default Resume;
