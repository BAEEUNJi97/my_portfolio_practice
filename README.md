# 배은지 포트폴리오 웹사이트

사용자 중심의 웹 개발자 배은지의 포트폴리오 웹사이트입니다. 연하늘색과 연그레이를 조합한 모던한 글래스모피즘 디자인으로 제작되었습니다.

## ✨ 주요 특징

- **🎨 글래스모피즘 디자인**: 반투명 유리 효과와 블러 처리로 세련된 UI
- **📱 완전 반응형**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 경험
- **♿ 접근성 최적화**: WCAG 가이드라인 준수, 스크린 리더 지원
- **⚡ 성능 최적화**: CSS 변수 활용, 클래스 기반 JavaScript 구조
- **🔍 SEO 최적화**: 메타 태그, 시맨틱 HTML, 구조화된 데이터

## 📁 프로젝트 구조

```
real_eunji/
├── index.html              # 메인 HTML 파일 (시맨틱 마크업, 접근성 최적화)
├── README.md              # 프로젝트 설명서
├── js/                    # JavaScript 파일
│   └── script.js          # 모듈화된 클래스 기반 스크립트
├── src/                   # 소스 코드
│   └── styles/            # CSS 스타일시트
│       └── style.css     # CSS 변수 활용, 최적화된 스타일
├── public/                # 정적 파일 (이미지, 아이콘 등)
└── images/                # 이미지 리소스
```

## 🛠️ 기술 스택

### Frontend

- **HTML5**: 시맨틱 마크업, ARIA 속성, 접근성 최적화
- **CSS3**: CSS 변수, Flexbox, Grid, 글래스모피즘 효과
- **JavaScript (ES6+)**: 클래스 기반 모듈화, Intersection Observer API
- **Google Fonts**: Noto Sans KR 웹폰트

### 최적화 및 성능

- **CSS 변수**: 일관된 디자인 시스템
- **RequestAnimationFrame**: 부드러운 애니메이션
- **Passive Event Listeners**: 스크롤 성능 최적화
- **Intersection Observer**: 효율적인 스크롤 애니메이션

## 🚀 시작하기

1. **프로젝트 다운로드**

   ```bash
   git clone [repository-url]
   cd real_eunji
   ```

2. **로컬 서버 실행** (권장)

   ```bash
   # Python 3 사용시
   python -m http.server 8000

   # Node.js 사용시
   npx serve .

   # Live Server (VS Code 확장) 사용시
   # index.html 우클릭 → "Open with Live Server"
   ```

3. **브라우저에서 확인**
   - `http://localhost:8000` 또는 `http://127.0.0.1:8000`

## 📱 반응형 지원

- **🖥️ 데스크톱**: 1200px 이상 (최적화된 레이아웃)
- **📱 태블릿**: 768px - 1199px (적응형 그리드)
- **📱 모바일**: 767px 이하 (터치 최적화)

## 🎯 주요 기능

### 네비게이션

- **부드러운 스크롤**: 헤더 높이를 고려한 정확한 스크롤
- **모바일 햄버거 메뉴**: 접근성 최적화된 모바일 네비게이션
- **키보드 네비게이션**: ESC 키로 메뉴 닫기 지원

### 애니메이션

- **스크롤 애니메이션**: Intersection Observer를 활용한 효율적인 애니메이션
- **호버 효과**: 3D 변환과 글래스모피즘 효과
- **로딩 애니메이션**: 부드러운 페이드인 효과

### 접근성

- **ARIA 속성**: 스크린 리더 지원
- **키보드 네비게이션**: 모든 인터랙티브 요소 접근 가능
- **포커스 관리**: 명확한 포커스 표시

## 📝 커스터마이징

### 🎨 색상 테마 변경

`src/styles/style.css` 파일의 CSS 변수를 수정하여 색상을 변경할 수 있습니다:

```css
:root {
  --primary-color: #38bdf8; /* 메인 색상 */
  --primary-dark: #0ea5e9; /* 진한 색상 */
  --text-primary: #374151; /* 텍스트 색상 */
  --bg-primary: #fafafa; /* 배경 색상 */
}
```

### 📝 콘텐츠 수정

`index.html` 파일에서 다음 정보를 수정할 수 있습니다:

- 개인 정보 (이름, 연락처, 소개)
- 프로젝트 정보 (제목, 설명, 링크)
- 기술 스택 및 경력

### ⚙️ 애니메이션 조정

`js/script.js` 파일에서 애니메이션 설정을 조정할 수 있습니다:

- 스크롤 애니메이션 속도
- 호버 효과 지속 시간
- 모바일 터치 감도

## 🔧 개발 가이드

### 코드 구조

- **모듈화된 JavaScript**: 클래스 기반 구조로 유지보수성 향상
- **CSS 변수 활용**: 일관된 디자인 시스템
- **시맨틱 HTML**: 접근성과 SEO 최적화

### 성능 최적화

- **RequestAnimationFrame**: 부드러운 애니메이션
- **Passive Event Listeners**: 스크롤 성능 향상
- **CSS 최적화**: 불필요한 리플로우 방지

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 용도로 제작되었습니다. 상업적 사용을 원하시면 문의해 주세요.

## 📞 연락처

- **이메일**: eebae0331@gmail.com
- **GitHub**: [BAEEUNJi97](https://github.com/BAEEUNJi97)
- **LinkedIn**: [배은지](https://www.linkedin.com/in/eunji-bae-394158335/)
- **블로그**: [qormafuf.tistory.com](https://qormafuf.tistory.com/)
