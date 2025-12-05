import React from "react";
import {
  Card,
  CardTitle,
  SummaryBox,
  ResultArea,
  ResultTitle,
  ResultSectionTitle,
  ResultBox,
  PromptBox,
  Badge,
  PillRow,
  ImageContainer,
  ImageLoading,
  ImageError,
} from "./styled";

const ResultCard = ({
  summary,
  result,
  imagePrompt,
  isGeneratingImage,
  imageError,
}) => {
  return (
    <Card>
      <CardTitle>그날이가 추천한 코디</CardTitle>

      <SummaryBox>
        {summary.split("\n").map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </SummaryBox>

      {result && (
        <ResultArea>
          <ResultTitle>{result.resultTitle}</ResultTitle>

          <PillRow>
            {result.tags.map((t, idx) => (
              <Badge key={idx}>{t}</Badge>
            ))}
          </PillRow>

          <ResultSectionTitle>이 코디를 추천한 이유</ResultSectionTitle>
          <ResultBox>
            {result.coordiDescription.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </ResultBox>

          <ResultSectionTitle>이렇게 입어보세요</ResultSectionTitle>
          <ResultBox>
            {result.itemList.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </ResultBox>

          <ResultSectionTitle>스타일링 꿀팁</ResultSectionTitle>
          <ResultBox>
            {result.tips.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </ResultBox>

          {imagePrompt && (
            <>
              <ResultSectionTitle>이미지 생성 프롬프트</ResultSectionTitle>
              <PromptBox>{imagePrompt}</PromptBox>
            </>
          )}

          {isGeneratingImage && (
            <ImageContainer>
              <ImageLoading>
                코디를 추천하고 있어요... 잠시만 기다려주세요! 🎨
              </ImageLoading>
            </ImageContainer>
          )}

          {imageError && (
            <ImageContainer>
              <ImageError>{imageError}</ImageError>
            </ImageContainer>
          )}
        </ResultArea>
      )}
    </Card>
  );
};

export default ResultCard;
