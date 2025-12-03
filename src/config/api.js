// API 설정
export const API_CONFIG = {
  // 이미지 생성 API 엔드포인트
  // 개발 환경에서는 로컬 서버, 프로덕션에서는 실제 서버 URL로 변경
  IMAGE_GENERATION_URL:
    import.meta.env.VITE_IMAGE_API_URL || "/api/generate-image",
};

