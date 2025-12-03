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
import { addressData, sidoList } from "../utils/addressData";

const FormCard = ({
  formData,
  handleChange,
  handleRadioChange,
  handleSelectChange,
  handleCheckboxChange,
  handleSubmit,
  isFormValid,
}) => {
  const sigunguList = formData.sido ? addressData[formData.sido] || [] : [];
  return (
    <Card>
      <CardTitle>그날의 나는 어떨지 그날이에게 알려주세요</CardTitle>

      <form onSubmit={handleSubmit} id="coordi-form">
        <SectionTitle>나에 대한 기본 정보</SectionTitle>
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
        <SectionTitle>그날의 날씨는 어떨까요?</SectionTitle>
        <FieldGroup>
          <Label>
            날씨 또는 지역과 날짜를 알려주세요 <RequiredStar>*</RequiredStar>
          </Label>
          <Row>
            <Select
              id="weatherMode"
              value={formData.weatherMode}
              onChange={handleSelectChange}
            >
              <option value="weather">날씨 직접 선택</option>
              <option value="region">지역과 날짜 입력</option>
            </Select>
          </Row>

          {formData.weatherMode === "weather" && (
            <div style={{ marginTop: 12 }}>
              <FieldGroup>
                <Label htmlFor="weather">날씨는 대강 이래요</Label>
                <Select
                  id="weather"
                  value={formData.weather}
                  onChange={handleSelectChange}
                >
                  <option value="mild">선선함</option>
                  <option value="hot">더움</option>
                  <option value="cold">추움</option>
                </Select>
              </FieldGroup>
              <FieldGroup>
                <Label htmlFor="temperature">온도 (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  placeholder="예: 20"
                  value={formData.temperature}
                  onChange={handleChange}
                  min="-20"
                  max="50"
                />
              </FieldGroup>
              <FieldGroup>
                <Label>추가로 있었던 날씨는? (선택)</Label>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      id="rain"
                      checked={formData.rain}
                      onChange={handleCheckboxChange}
                    />
                    <span>비</span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      id="snow"
                      checked={formData.snow}
                      onChange={handleCheckboxChange}
                    />
                    <span>눈</span>
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      id="wind"
                      checked={formData.wind}
                      onChange={handleCheckboxChange}
                    />
                    <span>바람</span>
                  </label>
                </div>
              </FieldGroup>
            </div>
          )}

          {formData.weatherMode === "region" && (
            <div style={{ marginTop: 12 }}>
              <Row>
                <FieldGroup>
                  <Label htmlFor="sido">
                    시도 <RequiredStar>*</RequiredStar>
                  </Label>
                  <Select
                    id="sido"
                    value={formData.sido}
                    onChange={handleSelectChange}
                  >
                    <option value="">시도 선택</option>
                    {sidoList.map((sido) => (
                      <option key={sido} value={sido}>
                        {sido}
                      </option>
                    ))}
                  </Select>
                </FieldGroup>
                <FieldGroup>
                  <Label htmlFor="sigungu">
                    시군구 <RequiredStar>*</RequiredStar>
                  </Label>
                  <Select
                    id="sigungu"
                    value={formData.sigungu}
                    onChange={handleSelectChange}
                    disabled={!formData.sido}
                  >
                    <option value="">시군구 선택</option>
                    {sigunguList.map((sigungu) => (
                      <option key={sigungu} value={sigungu}>
                        {sigungu}
                      </option>
                    ))}
                  </Select>
                </FieldGroup>
              </Row>
              <FieldGroup>
                <Label htmlFor="date">
                  날짜 <RequiredStar>*</RequiredStar>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </FieldGroup>
              <Hint>지역과 날짜를 알려주면 그날의 날씨를 찾을게요!</Hint>
            </div>
          )}
        </FieldGroup>

        <SectionDivider />
        <SectionTitle>내가 좋아하는 스타일</SectionTitle>
        <FieldGroup>
          <Label htmlFor="personalColor">내 퍼스널 컬러는? (선택)</Label>
          <Select
            id="personalColor"
            value={formData.personalColor}
            onChange={handleSelectChange}
          >
            <option value="">선택하지 않을래요</option>
            <option value="spring_warm">봄웜</option>
            <option value="summer_cool">여름쿨</option>
            <option value="autumn_warm">가을웜</option>
            <option value="winter_cool">겨울쿨</option>
            <option value="custom">직접 입력할게요</option>
          </Select>
          {formData.personalColor === "custom" && (
            <Input
              id="personalColorCustom"
              type="text"
              placeholder="예: 따뜻한 톤, 차분한 톤 등"
              value={formData.personalColorCustom}
              onChange={handleChange}
              style={{ marginTop: 8 }}
            />
          )}
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="style">좋아하는 스타일은? (선택)</Label>
          <Select
            id="style"
            value={formData.style}
            onChange={handleSelectChange}
          >
            <option value="">선택하지 않을래요</option>
            <option value="casual">캐주얼</option>
            <option value="minimal">미니멀</option>
            <option value="street">스트릿</option>
            <option value="lovely">러블리</option>
            <option value="office">오피스/포멀</option>
            <option value="custom">직접 입력할게요</option>
          </Select>
          {formData.style === "custom" && (
            <Input
              id="styleCustom"
              type="text"
              placeholder="예: 빈티지, 모던, 로맨틱 등"
              value={formData.styleCustom}
              onChange={handleChange}
              style={{ marginTop: 8 }}
            />
          )}
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="purpose">오늘 뭐하러 가나요? (선택)</Label>
          <Select
            id="purpose"
            value={formData.purpose}
            onChange={handleSelectChange}
          >
            <option value="">선택하지 않을래요</option>
            <option value="daily">일상/등교</option>
            <option value="date">데이트</option>
            <option value="interview">면접/발표</option>
            <option value="trip">여행</option>
            <option value="custom">직접 입력할게요</option>
          </Select>
          {formData.purpose === "custom" && (
            <Input
              id="purposeCustom"
              type="text"
              placeholder="예: 운동, 쇼핑, 모임 등"
              value={formData.purposeCustom}
              onChange={handleChange}
              style={{ marginTop: 8 }}
            />
          )}
        </FieldGroup>

        <FieldGroup>
          <Label>나는 더위/추위를 많이 타나요? (선택)</Label>
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
          <Label htmlFor="memo">
            특별히 원하거나 싫어하는 게 있나요? (선택)
          </Label>
          <Textarea
            id="memo"
            placeholder="예: 반바지는 안 입을래요 / 오늘은 흰 티로 고정할게요"
            value={formData.memo}
            onChange={handleChange}
          />
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="imageStyle">생성할 이미지 스타일은? (선택)</Label>
          <Select
            id="imageStyle"
            value={formData.imageStyle}
            onChange={handleSelectChange}
          >
            <option value="">선택하지 않을래요</option>
            <option value="realistic">실사 느낌</option>
            <option value="illustration">일러스트</option>
            <option value="editorial">패션 화보 느낌</option>
            <option value="custom">직접 입력할게요</option>
          </Select>
          {formData.imageStyle === "custom" && (
            <Input
              id="imageStyleCustom"
              type="text"
              placeholder="예: 미니멀, 컬러풀, 모노톤 등"
              value={formData.imageStyleCustom}
              onChange={handleChange}
              style={{ marginTop: 8 }}
            />
          )}
        </FieldGroup>

        <Button type="submit" disabled={!isFormValid}>
          코디 추천 받기
        </Button>
      </form>
    </Card>
  );
};

export default FormCard;
