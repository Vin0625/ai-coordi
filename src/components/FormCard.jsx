import React from "react";
import {
  Card,
  CardTitle,
  SectionTitle,
  SectionDivider,
  FieldGroup,
  Label,
  RequiredStar,
  Input,
  Select,
  Textarea,
  RadioGroup,
  RadioLabel,
  RadioSpan,
  Row,
  Hint,
  Button,
} from "./styled";

const FormCard = ({ formData, handleChange, handleRadioChange, handleSelectChange, handleSubmit }) => {
  return (
    <Card>
      <CardTitle>그날의 나는 어떨지 AI에게 알려주세요</CardTitle>

      <form onSubmit={handleSubmit} id="coordi-form">
        <SectionTitle>기본 정보</SectionTitle>
        <Row>
          <FieldGroup>
            <Label htmlFor="height">
              키 (cm) <RequiredStar>*</RequiredStar>
            </Label>
            <Input
              id="height"
              type="number"
              min="130"
              max="220"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="weight">
              몸무게 (kg) <RequiredStar>*</RequiredStar>
            </Label>
            <Input
              id="weight"
              type="number"
              min="30"
              max="200"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </FieldGroup>
        </Row>

        <Row>
          <FieldGroup>
            <Label>
              성별 <RequiredStar>*</RequiredStar>
            </Label>
            <RadioGroup>
              <RadioLabel>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleRadioChange}
                  required
                />
                <RadioSpan>남성</RadioSpan>
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleRadioChange}
                />
                <RadioSpan>여성</RadioSpan>
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleRadioChange}
                />
                <RadioSpan>기타</RadioSpan>
              </RadioLabel>
            </RadioGroup>
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="age">
              나이 <RequiredStar>*</RequiredStar>
            </Label>
            <Input
              id="age"
              type="number"
              min="10"
              max="80"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </FieldGroup>
        </Row>

        <SectionDivider />
        <SectionTitle>날씨 정보</SectionTitle>
        <FieldGroup>
          <Label>
            날씨 / 지역+날짜 <RequiredStar>*</RequiredStar>
          </Label>
          <Row>
            <Select
              id="weatherMode"
              value={formData.weatherMode}
              onChange={handleSelectChange}
            >
              <option value="weather">날씨 직접 선택</option>
              <option value="region">지역 + 날짜 입력</option>
            </Select>
            {formData.weatherMode === "weather" && (
              <Select
                id="weather"
                value={formData.weather}
                onChange={handleSelectChange}
              >
                <option value="mild">선선함</option>
                <option value="hot">더움</option>
                <option value="cold">추움</option>
                <option value="rainy">비/눈</option>
              </Select>
            )}
          </Row>

          {formData.weatherMode === "region" && (
            <div style={{ marginTop: 8 }}>
              <Row>
                <Input
                  id="region"
                  type="text"
                  placeholder="예: 서울, 부산..."
                  value={formData.region}
                  onChange={handleChange}
                />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Row>
              <Hint>
                지역과 날짜를 알려주면 그날의 날씨를 찾을게요!
              </Hint>
            </div>
          )}
        </FieldGroup>

        <SectionDivider />
        <SectionTitle>스타일 설정</SectionTitle>
        <FieldGroup>
          <Label htmlFor="personalColor">퍼스널 컬러 (선택)</Label>
          <Select
            id="personalColor"
            value={formData.personalColor}
            onChange={handleSelectChange}
          >
            <option value="">선택 안 함</option>
            <option value="spring_warm">봄웜</option>
            <option value="summer_cool">여름쿨</option>
            <option value="autumn_warm">가을웜</option>
            <option value="winter_cool">겨울쿨</option>
            <option value="custom">직접입력</option>
          </Select>
          {formData.personalColor === "custom" && (
            <Input
              id="personalColorCustom"
              type="text"
              placeholder="퍼스널 컬러를 직접 입력하세요"
              value={formData.personalColorCustom}
              onChange={handleChange}
              style={{ marginTop: 8 }}
            />
          )}
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="style">추구하는 스타일 (선택)</Label>
          <Select
            id="style"
            value={formData.style}
            onChange={handleSelectChange}
          >
            <option value="">선택 안 함</option>
            <option value="casual">캐주얼</option>
            <option value="minimal">미니멀</option>
            <option value="street">스트릿</option>
            <option value="lovely">러블리</option>
            <option value="office">오피스/포멀</option>
            <option value="custom">직접입력</option>
          </Select>
          {formData.style === "custom" && (
            <Input
              id="styleCustom"
              type="text"
              placeholder="스타일을 직접 입력하세요"
              value={formData.styleCustom}
              onChange={handleChange}
              style={{ marginTop: 8 }}
            />
          )}
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="purpose">목적 (선택)</Label>
          <Select
            id="purpose"
            value={formData.purpose}
            onChange={handleSelectChange}
          >
            <option value="">선택 안 함</option>
            <option value="daily">일상/등교</option>
            <option value="date">데이트</option>
            <option value="interview">면접/발표</option>
            <option value="trip">여행</option>
            <option value="custom">직접입력</option>
          </Select>
          {formData.purpose === "custom" && (
            <Input
              id="purposeCustom"
              type="text"
              placeholder="목적을 직접 입력하세요"
              value={formData.purposeCustom}
              onChange={handleChange}
              style={{ marginTop: 8 }}
            />
          )}
        </FieldGroup>

        <FieldGroup>
          <Label>온도 민감도 (선택)</Label>
          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="temp"
                value=""
                checked={formData.temp === ""}
                onChange={handleRadioChange}
              />
              <RadioSpan>보통</RadioSpan>
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="temp"
                value="cold"
                checked={formData.temp === "cold"}
                onChange={handleRadioChange}
              />
              <RadioSpan>추위를 많이 탐</RadioSpan>
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="temp"
                value="hot"
                checked={formData.temp === "hot"}
                onChange={handleRadioChange}
              />
              <RadioSpan>더위를 많이 탐</RadioSpan>
            </RadioLabel>
          </RadioGroup>
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="memo">선호/비선호, 기타 메모 (선택)</Label>
          <Textarea
            id="memo"
            placeholder="예: 반바지는 싫어요 / 오늘 상의는 흰 티 고정 등"
            value={formData.memo}
            onChange={handleChange}
          />
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="imageStyle">이미지 스타일 (선택)</Label>
          <Select
            id="imageStyle"
            value={formData.imageStyle}
            onChange={handleSelectChange}
          >
            <option value="">선택 안 함</option>
            <option value="realistic">실사 느낌</option>
            <option value="illustration">일러스트</option>
            <option value="editorial">패션 화보 느낌</option>
            <option value="custom">직접입력</option>
          </Select>
          {formData.imageStyle === "custom" && (
            <Input
              id="imageStyleCustom"
              type="text"
              placeholder="이미지 스타일을 직접 입력하세요"
              value={formData.imageStyleCustom}
              onChange={handleChange}
              style={{ marginTop: 8 }}
            />
          )}
        </FieldGroup>

        <Button type="submit">코디 추천 받기</Button>
      </form>
    </Card>
  );
};

export default FormCard;

