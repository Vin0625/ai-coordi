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
  Hint,
} from "./styled";

const ResultCard = ({ summary, result }) => {
  return (
    <Card>
      <CardTitle>추천 결과</CardTitle>

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

          <ResultSectionTitle>코디 설명</ResultSectionTitle>
          <ResultBox>
            {result.coordiDescription.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </ResultBox>

          <ResultSectionTitle>아이템 리스트</ResultSectionTitle>
          <ResultBox>
            {result.itemList.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </ResultBox>

          <ResultSectionTitle>스타일링 팁</ResultSectionTitle>
          <ResultBox>
            {result.tips.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </ResultBox>

          <ResultSectionTitle>이미지 생성용 프롬프트</ResultSectionTitle>
          <PromptBox>{result.imagePrompt}</PromptBox>
          <Hint>
            위 프롬프트를 그대로 복사해서 이미지 생성 도구에 넣으면 됩니다.
          </Hint>
        </ResultArea>
      )}
    </Card>
  );
};

export default ResultCard;

