// src/App.jsx
import React, { useState } from "react";
import { Header, HeaderTitle, Main } from "./components/styled";
import FormCard from "./components/FormCard";
import ResultCard from "./components/ResultCard";
import { API_CONFIG } from "./config/api";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    gender: "",
    age: "",
    weatherMode: "weather",
    weather: "mild",
    temperature: "",
    rain: false,
    snow: false,
    wind: false,
    sido: "",
    sigungu: "",
    detailRegion: "",
    date: "",
    personalColor: "",
    personalColorCustom: "",
    style: "",
    styleCustom: "",
    purpose: "",
    purposeCustom: "",
    temp: "", // cold / hot / ""
    memo: "",
    imageStyle: "",
    imageStyleCustom: "",
  });

  const [summary, setSummary] = useState(
    "아직 추천 전이에요! 👕\n왼쪽에 정보를 입력하면 여기에 코디 추천이 나타날 거예요."
  );

  const [result, setResult] = useState(null); // null이면 아직 결과 없음
  const [imagePrompt, setImagePrompt] = useState(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageError, setImageError] = useState(null);

  // 공통 입력 핸들러 (text, number, select 등)
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 라디오 버튼용 핸들러
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // select (weatherMode 등)용
  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [id]: value,
      };
      // 시도 선택 시 시군구 초기화
      if (id === "sido") {
        newData.sigungu = "";
      }
      return newData;
    });
  };

  // 체크박스 핸들러
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const buildSummary = (data) => {
    const genderText = data.gender === "male" ? "남성" : "여성";

    let weatherText = "";
    if (data.weatherMode === "weather") {
      const map = {
        mild: "선선한 날씨",
        hot: "더운 날씨",
        cold: "추운 날씨",
      };
      weatherText = map[data.weather] || "";
      if (data.temperature) {
        weatherText += ` (${data.temperature}°C)`;
      }
      const conditions = [];
      if (data.rain) conditions.push("비");
      if (data.snow) conditions.push("눈");
      if (data.wind) conditions.push("바람");
      if (conditions.length > 0) {
        weatherText += `, ${conditions.join(", ")}`;
      }
    } else {
      let regionText = `${data.sido || ""} ${data.sigungu || ""}`;
      if (data.detailRegion) {
        regionText += ` ${data.detailRegion}`;
      }
      weatherText = `${regionText} ${data.date || ""} 날씨`;
    }

    return `${data.age}세 ${genderText}, ${data.height}cm / ${data.weight}kg, ${weatherText} 기준 코디 추천`;
  };

  const generateResult = (rawData) => {
    // number 변환
    const data = {
      ...rawData,
      height: Number(rawData.height),
      weight: Number(rawData.weight),
      age: Number(rawData.age),
    };

    const genderText = data.gender === "female" ? "여성" : "남성";
    const styleMap = {
      "": "데일리",
      casual: "캐주얼",
      minimal: "미니멀",
      street: "스트릿",
      lovely: "러블리",
      office: "오피스",
      custom: data.styleCustom || "데일리",
    };
    const styleText =
      data.style === "custom"
        ? data.styleCustom || "데일리"
        : styleMap[data.style] || "데일리";

    const purposeMap = {
      "": "일상",
      daily: "등교/출근",
      date: "데이트",
      interview: "면접/발표",
      trip: "여행",
      custom: data.purposeCustom || "일상",
    };
    const purposeText =
      data.purpose === "custom"
        ? data.purposeCustom || "일상"
        : purposeMap[data.purpose] || "일상";

    // 타이틀
    const resultTitle = `${styleText} ${purposeText} 코디 추천`;

    // 태그
    const tags = [
      `${genderText}`,
      `${Math.round(data.age)}세`,
      `${Math.round(data.height)}cm`,
      `${Math.round(data.weight)}kg`,
    ];
    if (data.personalColor) {
      if (data.personalColor === "custom" && data.personalColorCustom) {
        tags.push(data.personalColorCustom);
      } else {
        const pcMap = {
          spring_warm: "봄웜",
          summer_cool: "여름쿨",
          autumn_warm: "가을웜",
          winter_cool: "겨울쿨",
        };
        tags.push(pcMap[data.personalColor] || "");
      }
    }
    if (data.style) tags.push(styleText + "룩");
    if (data.purpose) tags.push(purposeText);
    if (data.weatherMode === "weather") {
      const wMap = {
        mild: "선선한 날씨",
        hot: "더운 날씨",
        cold: "추운 날씨",
      };
      tags.push(wMap[data.weather]);
      if (data.temperature) {
        tags.push(`${data.temperature}°C`);
      }
      if (data.rain) tags.push("비");
      if (data.snow) tags.push("눈");
      if (data.wind) tags.push("바람");
    }
    if (data.temp) {
      tags.push(
        data.temp === "cold"
          ? "추위를 많이 탐"
          : data.temp === "hot"
          ? "더위를 많이 탐"
          : "보통 체감"
      );
    }

    // 코디 설명
    let weatherSentence = "";
    if (data.weatherMode === "weather") {
      switch (data.weather) {
        case "cold":
          weatherSentence =
            "추운 날씨에 맞춰 보온을 챙기되, 부해 보이지 않도록 레이어링을 활용합니다.";
          break;
        case "hot":
          weatherSentence =
            "더운 날씨에 맞게 통풍이 잘 되는 얇은 원단과 밝은 색 위주로 구성합니다.";
          break;
        default:
          weatherSentence =
            "선선한 날씨에 맞는 가벼운 아우터와 베이직한 아이템으로 구성합니다.";
      }
      if (data.rain || data.snow) {
        weatherSentence +=
          " 비/눈을 고려해 방수 소재와 쉽게 젖지 않는 아이템을 선택합니다.";
      }
      if (data.wind) {
        weatherSentence += " 바람을 고려해 적절한 아우터를 선택합니다.";
      }
    } else {
      let regionText = `${data.sido || ""} ${data.sigungu || ""}`;
      if (data.detailRegion) {
        regionText += ` ${data.detailRegion}`;
      }
      weatherSentence = `${regionText} 지역 날씨에 맞춰 코디를 구성합니다.`;
    }

    const coordiDescription =
      `${genderText} ${data.age}세, ${styleText} 무드를 좋아하는 사용자를 위한 ${purposeText} 코디입니다.\n` +
      `${weatherSentence}\n` +
      (data.personalColor
        ? "퍼스널 컬러를 고려해 얼굴이 화사해 보이는 톤으로 컬러를 선택합니다.\n"
        : "") +
      (data.memo ? `추가로, 사용자의 메모를 반영합니다: ${data.memo}` : "");

    // 아이템 리스트
    let top = "";
    let bottom = "";
    let outer = "";
    let shoes = "";
    let acc = "";

    if (data.style === "minimal") {
      top = "깔끔한 흰색 또는 아이보리 셔츠/니트";
      bottom = "슬림 스트레이트 핏 슬랙스 또는 생지 데님";
      outer = data.weather === "cold" ? "심플한 싱글 코트" : "미니멀한 자켓";
      shoes = "로퍼 또는 깔끔한 스니커즈";
      acc = "심플한 시계, 작은 실버 액세서리";
    } else if (data.style === "street") {
      top = "루즈핏 그래픽 티셔츠 또는 후드";
      bottom = "와이드핏 데님 또는 카고 팬츠";
      outer = data.weather === "cold" ? "오버핏 패딩" : "바람막이/코치 자켓";
      shoes = "러닝화/스니커즈";
      acc = "볼캡, 백팩 또는 크로스백";
    } else if (data.style === "lovely" && data.gender === "female") {
      top = "파스텔톤 블라우스 또는 니트";
      bottom = "플레어 스커트 또는 미디 원피스";
      outer =
        data.weather === "cold" ? "포근한 핸드메이드 코트" : "크롭 가디건";
      shoes = "플랫슈즈 또는 앵클부츠";
      acc = "작은 귀걸이, 미니백";
    } else {
      // 기본 캐주얼
      top = "베이직 티셔츠 또는 셔츠";
      bottom = "슬림 또는 스트레이트 핏 데님";
      outer =
        data.weather === "cold"
          ? "패딩 또는 두께감 있는 코트"
          : data.weather === "rainy"
          ? "가벼운 아노락/바람막이"
          : "가벼운 자켓/셔켓";
      shoes = "화이트 스니커즈";
      acc = "간단한 가방, 시계";
    }

    const itemList =
      `상의: ${top}\n` +
      `하의: ${bottom}\n` +
      `아우터: ${outer}\n` +
      `신발: ${shoes}\n` +
      `악세사리: ${acc}`;

    // 스타일링 팁
    const tips =
      "- 상의는 너무 오버핏보다는 몸에 살짝 여유 있는 정도로 선택하면 비율이 좋아 보입니다.\n" +
      "- 하의는 발등에 살짝 떨어지는 기장을 선택하면 다리가 더 길어 보입니다.\n" +
      "- 전체 컬러는 3가지 이내로 맞추면 깔끔하고 세련된 인상을 줄 수 있습니다.\n" +
      (data.temp === "cold"
        ? "- 추위를 많이 탄다면 이너를 한 겹 더 입고, 목도리/머플러를 활용해 보온을 챙겨주세요.\n"
        : data.temp === "hot"
        ? "- 더위를 많이 탄다면 통풍이 잘 되는 린넨/코튼 소재를 위주로 선택하는 것이 좋습니다.\n"
        : "");

    // 이미지 프롬프트
    const pcTextMap = {
      spring_warm: "spring warm tone color palette",
      summer_cool: "summer cool tone color palette",
      autumn_warm: "autumn warm tone color palette",
      winter_cool: "winter cool tone color palette",
    };
    let pcText = "";
    if (data.personalColor) {
      if (data.personalColor === "custom" && data.personalColorCustom) {
        pcText = data.personalColorCustom;
      } else {
        pcText = pcTextMap[data.personalColor] || "";
      }
    }

    // 이미지 스타일 텍스트
    const imageStyleMap = {
      realistic: "photorealistic, high quality photo",
      illustration: "fashion illustration, artistic style",
      editorial: "editorial fashion photography, magazine style",
      custom: data.imageStyleCustom || "",
    };
    const imageStyleText =
      data.imageStyle === "custom"
        ? data.imageStyleCustom || ""
        : imageStyleMap[data.imageStyle] || "lookbook style";

    let weatherDesc = "";
    if (data.weatherMode === "weather") {
      weatherDesc =
        data.weather === "cold"
          ? "cold weather"
          : data.weather === "hot"
          ? "hot weather"
          : "mild weather";
      if (data.temperature) {
        weatherDesc += `, ${data.temperature}°C`;
      }
      const conditions = [];
      if (data.rain) conditions.push("rainy");
      if (data.snow) conditions.push("snowy");
      if (data.wind) conditions.push("windy");
      if (conditions.length > 0) {
        weatherDesc += `, ${conditions.join(", ")}`;
      }
    } else {
      let regionText = `${data.sido || ""} ${data.sigungu || ""}`;
      if (data.detailRegion) {
        regionText += ` ${data.detailRegion}`;
      }
      weatherDesc = `${regionText} weather`;
    }

    const imagePrompt =
      `full-body fashion ${
        data.imageStyle === "illustration" ? "illustration" : "image"
      } of a ${data.age}-year-old ${
        genderText === "여성" ? "woman" : "man"
      }, ` +
      `${styleText} style outfit for ${weatherDesc}, ` +
      `${pcText ? pcText + ", " : ""}` +
      `${top}, ${bottom}, ${outer}, wearing ${shoes}, with ${acc}. ` +
      `clean background, ${imageStyleText}, high quality, detailed clothing textures`;

    return {
      resultTitle,
      tags,
      coordiDescription,
      itemList,
      tips,
      imagePrompt,
    };
  };

  // 필수 항목이 모두 입력되었는지 확인
  const isFormValid = () => {
    const hasBasicInfo =
      formData.height && formData.weight && formData.gender && formData.age;

    let hasWeatherInfo = false;
    if (formData.weatherMode === "weather") {
      hasWeatherInfo = !!formData.weather;
    } else {
      hasWeatherInfo = !!(formData.sido && formData.sigungu && formData.date);
    }

    return hasBasicInfo && hasWeatherInfo;
  };

  // 구조화된 데이터 생성 함수
  const buildStructuredData = (data) => {
    // number 변환
    const processedData = {
      ...data,
      height: Number(data.height),
      weight: Number(data.weight),
      age: Number(data.age),
    };

    return {
      userInfo: {
        age: processedData.age,
        gender: processedData.gender, // "female" or "male"
        height: processedData.height, // cm
        weight: processedData.weight, // kg
        tempSensitivity: processedData.temp || "normal", // "cold", "hot", "normal"
      },
      style: {
        personalColor:
          processedData.personalColor === "custom"
            ? processedData.personalColorCustom
            : processedData.personalColor, // "spring_warm", "summer_cool", etc. or custom string
        preferredStyle:
          processedData.style === "custom"
            ? processedData.styleCustom
            : processedData.style, // "minimal", "casual", "street", etc. or custom string
        purpose:
          processedData.purpose === "custom"
            ? processedData.purposeCustom
            : processedData.purpose, // "daily", "date", "interview", etc. or custom string
      },
      weather:
        processedData.weatherMode === "weather"
          ? {
              mode: "weather",
              condition: processedData.weather, // "mild", "hot", "cold"
              temperature: processedData.temperature
                ? Number(processedData.temperature)
                : null, // Celsius
              rain: processedData.rain || false,
              snow: processedData.snow || false,
              wind: processedData.wind || false,
            }
          : {
              mode: "region",
              sido: processedData.sido, // 시도
              sigungu: processedData.sigungu, // 시군구
              detailRegion: processedData.detailRegion || "", // 상세 지역 (읍면동 등)
              date: processedData.date, // 날짜
            },
      imageStyle:
        processedData.imageStyle === "custom"
          ? processedData.imageStyleCustom
          : processedData.imageStyle, // "realistic", "illustration", "editorial", or custom string
      memo: processedData.memo || "", // 추가 메모
    };
  };

  // 코디 추천 함수 (서버에서 result 데이터와 imagePrompt 받음)
  const generateCoordi = async (structuredData) => {
    setIsGeneratingImage(true);
    setImageError(null);
    setImagePrompt(null);
    setResult(null); // 이전 결과 초기화

    try {
      const response = await fetch(API_CONFIG.IMAGE_GENERATION_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(structuredData),
      });

      if (!response.ok) {
        throw new Error("코디 추천에 실패했어요");
      }

      const data = await response.json();

      // 서버에서 받은 result 데이터 설정
      if (
        data.resultTitle &&
        data.tags &&
        data.coordiDescription &&
        data.itemList &&
        data.tips
      ) {
        setResult({
          resultTitle: data.resultTitle,
          tags: data.tags,
          coordiDescription: data.coordiDescription,
          itemList: data.itemList,
          tips: data.tips,
        });
      } else {
        throw new Error("서버 응답 형식이 올바르지 않아요");
      }

      // 이미지 프롬프트 설정 (있으면)
      if (data.imagePrompt) {
        setImagePrompt(data.imagePrompt);
      }
    } catch (error) {
      console.error("Coordi generation error:", error);
      setImageError(error.message || "코디 추천 중 오류가 발생했어요");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수값 체크
    if (!isFormValid()) {
      alert("필수 항목을 모두 입력해주세요!");
      return;
    }

    const newSummary = buildSummary(formData);
    setSummary(newSummary);

    // 서버에서 코디 추천 및 이미지 생성 (구조화된 데이터 전송)
    const structuredData = buildStructuredData(formData);
    await generateCoordi(structuredData);
  };

  return (
    <div>
      <Header>
        <HeaderTitle>그날아 뭐입지?</HeaderTitle>
      </Header>

      <Main>
        <FormCard
          formData={formData}
          handleChange={handleChange}
          handleRadioChange={handleRadioChange}
          handleSelectChange={handleSelectChange}
          handleCheckboxChange={handleCheckboxChange}
          handleSubmit={handleSubmit}
          isFormValid={isFormValid()}
        />
        <ResultCard
          summary={summary}
          result={result}
          imagePrompt={imagePrompt}
          isGeneratingImage={isGeneratingImage}
          imageError={imageError}
        />
      </Main>
    </div>
  );
};

export default App;
