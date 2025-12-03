import styled from "styled-components";

// 컬러 테마
export const theme = {
  colors: {
    background: "#faf7f2",
    cardBackground: "#fffdf8",
    primary: "#222222",
    secondary: "#C89F7B",
    accent: "#E07A5F",
    text: "#222222",
    textSecondary: "#8A8A8A",
  },
};

// 기본 Box 컴포넌트
export const Box = styled.div`
  ${(props) => props.sx || ""}
`;

// 헤더
export const Header = styled.header`
  padding: 32px 48px;
  background: linear-gradient(
    135deg,
    rgba(200, 159, 123, 1) 0%,
    rgba(224, 122, 95, 0.95) 100%
  );
  border-bottom: 2px solid rgba(200, 159, 123, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 4px 16px rgba(200, 159, 123, 0.25);
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 36px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 1px;
  text-align: center;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 840px) {
    font-size: 30px;
  }
`;

// 메인 컨테이너
export const Main = styled.main`
  max-width: 1400px;
  margin: 48px auto;
  padding: 0 48px 64px;
  display: grid;
  grid-template-columns: 1.1fr 1.3fr;
  gap: 40px;

  @media (max-width: 1200px) {
    max-width: 100%;
    padding: 0 32px 48px;
  }

  @media (max-width: 840px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 0 20px 40px;
  }
`;

// 카드
export const Card = styled.section`
  background: ${theme.colors.cardBackground};
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(200, 159, 123, 0.1);
  border: 1px solid rgba(200, 159, 123, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(200, 159, 123, 0.15);
  }

  @media (max-width: 840px) {
    padding: 28px 24px;
  }
`;

export const CardTitle = styled.h2`
  margin-top: 0;
  font-size: 28px;
  margin-bottom: 32px;
  color: ${theme.colors.primary};
  font-weight: 400;
  letter-spacing: 0.5px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(200, 159, 123, 0.2);
  line-height: 1.4;

  @media (max-width: 840px) {
    font-size: 24px;
  }
`;

// 섹션
export const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 24px;
  margin-top: 8px;
`;

export const SectionDivider = styled.hr`
  margin: 32px 0 24px;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(200, 159, 123, 0.3),
    transparent
  );
  border: none;
`;

// 필드 그룹
export const FieldGroup = styled.div`
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${theme.colors.primary};
  letter-spacing: -0.1px;
`;

export const RequiredStar = styled.span`
  color: ${theme.colors.accent};
`;

// 입력 필드
export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  border-radius: 12px;
  border: 1.5px solid ${theme.colors.secondary};
  outline: none;
  background: #ffffff;
  color: ${theme.colors.primary};
  transition: all 0.2s ease;
  font-family: inherit;
  font-weight: 400;

  &:hover {
    border-color: ${theme.colors.accent};
  }

  &:focus {
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 4px rgba(224, 122, 95, 0.12);
    background: #ffffff;
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
    opacity: 0.7;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  padding-right: 36px;
  font-size: 15px;
  border-radius: 12px;
  border: 1.5px solid ${theme.colors.secondary};
  outline: none;
  background: #ffffff;
  color: ${theme.colors.primary};
  transition: all 0.2s ease;
  font-family: inherit;
  font-weight: 400;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23c89f7b' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;

  &:hover {
    border-color: ${theme.colors.accent};
  }

  &:focus {
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 4px rgba(224, 122, 95, 0.12);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  border-radius: 12px;
  border: 1.5px solid ${theme.colors.secondary};
  outline: none;
  background: #ffffff;
  color: ${theme.colors.primary};
  transition: all 0.2s ease;
  font-family: inherit;
  font-weight: 400;
  resize: vertical;
  min-height: 80px;
  line-height: 1.6;

  &:hover {
    border-color: ${theme.colors.accent};
  }

  &:focus {
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 4px rgba(224, 122, 95, 0.12);
    background: #ffffff;
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
    opacity: 0.7;
  }
`;

// 라디오 그룹
export const RadioGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 15px;
`;

export const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1.5px solid ${theme.colors.secondary};
  background: #ffffff;
  color: ${theme.colors.primary};
  transition: all 0.2s ease;
  user-select: none;
  position: relative;

  &:hover {
    background: rgba(200, 159, 123, 0.08);
    border-color: ${theme.colors.accent};
  }

  input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  input[type="radio"]:checked + span {
    color: white;
    font-weight: 600;
  }

  &:has(input[type="radio"]:checked) {
    background: ${theme.colors.accent};
    border-color: ${theme.colors.accent};
    color: white;
  }

  &:has(input[type="radio"]:checked) span {
    color: white;
    font-weight: 600;
  }
`;

export const RadioSpan = styled.span``;

// 버튼
export const Button = styled.button`
  margin-top: 32px;
  padding: 16px 28px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #e07a5f 0%, #d4694f 100%);
  color: white;
  font-size: 17px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(224, 122, 95, 0.25);
  width: 100%;
  letter-spacing: 0.3px;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #d4694f 0%, #c85a3f 100%);
    box-shadow: 0 6px 16px rgba(224, 122, 95, 0.35);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(224, 122, 95, 0.25);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
    transform: none;
    background: ${theme.colors.secondary};
  }
`;

// 행 레이아웃
export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
`;

// 힌트 텍스트
export const Hint = styled.p`
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  font-weight: 400;
  margin-top: 8px;
`;

// 뱃지
export const Badge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 12px;
  background: rgba(200, 159, 123, 0.15);
  color: ${theme.colors.secondary};
  margin-right: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  border: 1px solid rgba(200, 159, 123, 0.2);
`;

export const PillRow = styled.div`
  margin-top: 12px;
  margin-bottom: 20px;
`;

// 결과 영역
export const SummaryBox = styled.div`
  font-size: 15px;
  background: linear-gradient(
    135deg,
    rgba(200, 159, 123, 0.1) 0%,
    rgba(224, 122, 95, 0.08) 100%
  );
  border-radius: 14px;
  padding: 20px 24px;
  margin-bottom: 24px;
  border: 1.5px solid rgba(200, 159, 123, 0.2);
  color: ${theme.colors.primary};
  line-height: 1.7;
  font-weight: 400;
`;

export const ResultTitle = styled.div`
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 20px;
  color: ${theme.colors.primary};
  letter-spacing: 1px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(200, 159, 123, 0.2);
  line-height: 1.3;

  @media (max-width: 840px) {
    font-size: 26px;
  }
`;

export const ResultSectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: 28px;
  margin-bottom: 14px;
  color: ${theme.colors.accent};
  border-bottom: 1.5px solid ${theme.colors.secondary};
  padding-bottom: 8px;
  letter-spacing: 0.3px;
`;

export const ResultBox = styled.div`
  font-size: 15px;
  line-height: 1.8;
  white-space: pre-line;
  color: ${theme.colors.primary};
  background: rgba(255, 255, 255, 0.6);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 8px;
  border: 1px solid rgba(200, 159, 123, 0.1);
  font-weight: 400;
`;

export const PromptBox = styled(ResultBox)`
  font-family: "Monaco", "Menlo", "Courier New", monospace;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.8) !important;
  border: 1.5px solid rgba(200, 159, 123, 0.2) !important;
  padding: 18px !important;
  line-height: 1.6;
  word-break: break-word;
  position: relative;

  &::before {
    content: "📋";
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 16px;
    opacity: 0.5;
  }
`;

export const ResultArea = styled.div`
  animation: fadeIn 0.4s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
