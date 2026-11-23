/**
 * Google Style Startpage Script
 * 서울 & 제주 실시간 날씨, 구글 검색, 오늘의 명언, 다크 모드, 실시간 시계
 */

// ==========================================================================
// 1. 명언 데이터베이스 (Quotes Database)
// ==========================================================================
const quotes = [
  { text: "시작이 반이다. 시작하는 용기만 있다면 무엇이든 해낼 수 있다.", author: "아리스토텔레스" },
  { text: "오늘 할 수 있는 일에 온 힘을 쏟아라. 그러면 내일은 한 걸음 더 나아가 있을 것이다.", author: "아이작 뉴턴" },
  { text: "단순함이 궁극의 정교함이다.", author: "레오나르도 다빈치" },
  { text: "늘 갈망하고 우직하게 나아가라 (Stay hungry, stay foolish).", author: "스티브 잡스" },
  { text: "우리가 할 수 있는 가장 아름다운 경험은 바로 신비로움이다.", author: "알베르트 아인슈타인" },
  { text: "바람이 불지 않으면 노를 저어라.", author: "윈스턴 처칠" },
  { text: "어제와 똑같이 살면서 다른 미래를 기대하는 것은 정신병 초기증세이다.", author: "알베르트 아인슈타인" },
  { text: "행복은 목적지가 아니라 여행하는 방식이다.", author: "로이 M. 굿맨" },
  { text: "가장 어두운 밤도 언젠가는 끝나고 해는 떠오를 것이다.", author: "빅토르 위고" },
  { text: "실패를 두려워하지 말라. 실패는 배움의 또 다른 이름이다.", author: "헨리 포드" },
  { text: "스스로를 믿어라. 당신은 생각하는 것보다 훨씬 더 큰 힘을 가지고 있다.", author: "헬렌 켈러" },
  { text: "꿈을 이루고자 하는 열망이 있다면, 당신은 이미 반은 성공한 것이다.", author: "시어도어 루스벨트" },
  { text: "남과 비교하지 말고 오직 어제의 자신보다 나아졌는지를 확인하라.", author: "조던 피터슨" },
  { text: "천 리 길도 한 걸음부터 시작된다.", author: "노자" },
  { text: "인생은 속도가 아니라 방향이다.", author: "요한 볼프강 폰 괴테" },
  { text: "작은 일에 충실한 것이 위대한 일의 시작이다.", author: "마더 테레사" },
  { text: "우리의 운명은 별에 있는 것이 아니라 우리 자신에게 있다.", author: "윌리엄 셰익스피어" },
  { text: "행동은 모든 성공의 가장 기본적인 열쇠이다.", author: "파블로 피카소" },
  { text: "미래를 예측하는 가장 좋은 방법은 스스로 미래를 창조하는 것이다.", author: "피터 드러커" },
  { text: "변화는 고통스럽지만, 변하지 않고 머무는 것만큼 위험한 것은 없다.", author: "존 C. 맥스웰" },
  { text: "오늘 걷지 않으면 내일은 뛰어야 한다.", author: "카를레스 푸욜" },
  { text: "마음먹은 순간 이미 절반은 이루어진 것이다.", author: "요한 볼프강 폰 괴테" },
  { text: "인내할 수 있는 사람은 그가 바라는 것은 무엇이든 얻을 수 있다.", author: "벤저민 프랭클린" },
  { text: "지혜로운 자는 남의 결점에서 배우고, 어리석은 자는 자기 실수에서도 배우지 못한다.", author: "키케로" },
  { text: "위대한 일을 달성하기 위해선 행동할 뿐만 아니라 꿈을 꾸어야 한다.", author: "아나톨 프랑스" }
];

// ==========================================================================
// 2. WMO 날씨 코드 및 SVG 아이콘 매핑
// ==========================================================================
const weatherIcons = {
  sunny: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="14" fill="#FBBC05"/><g stroke="#FBBC05" stroke-width="4" stroke-linecap="round"><line x1="32" y1="6" x2="32" y2="12"/><line x1="32" y1="52" x2="32" y2="58"/><line x1="6" y1="32" x2="12" y2="32"/><line x1="52" y1="32" x2="58" y2="32"/><line x1="13.6" y1="13.6" x2="17.8" y2="17.8"/><line x1="46.2" y1="46.2" x2="50.4" y2="50.4"/><line x1="13.6" y1="50.4" x2="17.8" y2="46.2"/><line x1="46.2" y1="17.8" x2="50.4" y2="13.6"/></g></svg>`,
  partlyCloudy: `<svg viewBox="0 0 64 64"><circle cx="26" cy="24" r="10" fill="#FBBC05"/><path d="M46 44H22a10 10 0 0 1-1.6-19.9A14 14 0 0 1 47.7 27 9 9 0 0 1 46 44z" fill="#9AA0A6"/></svg>`,
  cloudy: `<svg viewBox="0 0 64 64"><path d="M48 46H20a12 12 0 0 1-2-23.8A16 16 0 0 1 49.8 26 10 10 0 0 1 48 46z" fill="#BDC1C6"/></svg>`,
  rain: `<svg viewBox="0 0 64 64"><path d="M46 36H22a10 10 0 0 1-1.6-19.9A14 14 0 0 1 47.7 19 9 9 0 0 1 46 36z" fill="#78909C"/><g stroke="#4285F4" stroke-width="3" stroke-linecap="round"><line x1="24" y1="42" x2="20" y2="50"/><line x1="34" y1="42" x2="30" y2="50"/><line x1="44" y1="42" x2="40" y2="50"/></g></svg>`,
  snow: `<svg viewBox="0 0 64 64"><path d="M46 36H22a10 10 0 0 1-1.6-19.9A14 14 0 0 1 47.7 19 9 9 0 0 1 46 36z" fill="#B0BEC5"/><g fill="#80D8FF"><circle cx="22" cy="46" r="2.5"/><circle cx="32" cy="48" r="2.5"/><circle cx="42" cy="46" r="2.5"/><circle cx="27" cy="54" r="2.5"/><circle cx="37" cy="54" r="2.5"/></g></svg>`,
  thunderstorm: `<svg viewBox="0 0 64 64"><path d="M46 34H22a10 10 0 0 1-1.6-19.9A14 14 0 0 1 47.7 17 9 9 0 0 1 46 34z" fill="#5F6368"/><polygon points="34,36 26,48 33,48 30,58 40,45 33,45" fill="#FBBC05"/></svg>`,
  fog: `<svg viewBox="0 0 64 64"><path d="M46 30H22a10 10 0 0 1-1.6-19.9A14 14 0 0 1 47.7 13 9 9 0 0 1 46 30z" fill="#B0BEC5"/><g stroke="#90A4AE" stroke-width="3" stroke-linecap="round"><line x1="16" y1="38" x2="48" y2="38"/><line x1="20" y1="45" x2="44" y2="45"/><line x1="18" y1="52" x2="46" y2="52"/></g></svg>`
};

function getWeatherInfoFromCode(code) {
  // WMO Code 해설
  if (code === 0) {
    return { desc: "맑음", icon: weatherIcons.sunny };
  } else if (code === 1 || code === 2) {
    return { desc: "대체로 맑음 / 구름 조금", icon: weatherIcons.partlyCloudy };
  } else if (code === 3) {
    return { desc: "흐림", icon: weatherIcons.cloudy };
  } else if (code === 45 || code === 48) {
    return { desc: "안개", icon: weatherIcons.fog };
  } else if ([51, 53, 55, 56, 57].includes(code)) {
    return { desc: "이슬비", icon: weatherIcons.rain };
  } else if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { desc: "비 / 소나기", icon: weatherIcons.rain };
  } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { desc: "눈", icon: weatherIcons.snow };
  } else if ([95, 96, 99].includes(code)) {
    return { desc: "뇌우", icon: weatherIcons.thunderstorm };
  } else {
    return { desc: "맑음", icon: weatherIcons.sunny };
  }
}

// ==========================================================================
// 3. 날씨 데이터 조회 (서울, 제주)
// ==========================================================================
const cities = {
  seoul: {
    name: "서울",
    lat: 37.5665,
    lon: 126.9780,
    elements: {
      card: document.getElementById("weather-seoul"),
      badge: document.getElementById("seoul-status-badge"),
      icon: document.getElementById("seoul-icon"),
      temp: document.getElementById("seoul-temp"),
      desc: document.getElementById("seoul-desc"),
      range: document.getElementById("seoul-range"),
      humidity: document.getElementById("seoul-humidity"),
      wind: document.getElementById("seoul-wind")
    }
  },
  jeju: {
    name: "제주",
    lat: 33.4996,
    lon: 126.5312,
    elements: {
      card: document.getElementById("weather-jeju"),
      badge: document.getElementById("jeju-status-badge"),
      icon: document.getElementById("jeju-icon"),
      temp: document.getElementById("jeju-temp"),
      desc: document.getElementById("jeju-desc"),
      range: document.getElementById("jeju-range"),
      humidity: document.getElementById("jeju-humidity"),
      wind: document.getElementById("jeju-wind")
    }
  }
};

async function fetchCityWeather(cityKey) {
  const city = cities[cityKey];
  const el = city.elements;

  el.badge.textContent = "갱신 중...";
  el.badge.className = "weather-badge status-loading";

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    const current = data.current;
    const daily = data.daily;

    const weatherInfo = getWeatherInfoFromCode(current.weather_code);
    
    // UI 업데이트
    el.icon.innerHTML = weatherInfo.icon;
    el.temp.textContent = `${Math.round(current.temperature_2m)}°`;
    el.desc.textContent = weatherInfo.desc;
    
    const maxTemp = Math.round(daily.temperature_2m_max[0]);
    const minTemp = Math.round(daily.temperature_2m_min[0]);
    el.range.textContent = `${maxTemp}° / ${minTemp}°`;

    el.humidity.textContent = `${current.relative_humidity_2m}%`;
    el.wind.textContent = `${current.wind_speed_10m.toFixed(1)} m/s`;

    el.badge.textContent = "실시간";
    el.badge.className = "weather-badge status-live";
  } catch (error) {
    console.error(`${city.name} 날씨 조회 실패:`, error);
    // 오프라인이거나 네트워크 에러 시 안전한 폴백(기본값) 표시
    el.badge.textContent = "오프라인";
    el.badge.className = "weather-badge status-loading";
    el.icon.innerHTML = weatherIcons.partlyCloudy;
    el.temp.textContent = cityKey === "seoul" ? "12°" : "16°";
    el.desc.textContent = "대체로 맑음 (로컬)";
    el.range.textContent = cityKey === "seoul" ? "15° / 6°" : "18° / 11°";
    el.humidity.textContent = "55%";
    el.wind.textContent = "2.1 m/s";
  }
}

function updateAllWeather() {
  fetchCityWeather("seoul");
  fetchCityWeather("jeju");
  
  const tag = document.getElementById("weather-update-tag");
  if (tag) {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} 기준`;
    tag.textContent = timeStr;
  }
}

// ==========================================================================
// 4. 오늘의 명언 (Quote of the day)
// ==========================================================================
let currentQuoteIndex = -1;

function displayRandomQuote() {
  const quoteTextEl = document.getElementById("quote-text");
  const quoteAuthorEl = document.getElementById("quote-author");

  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * quotes.length);
  } while (quotes.length > 1 && nextIndex === currentQuoteIndex);

  currentQuoteIndex = nextIndex;
  const quote = quotes[currentQuoteIndex];

  // 부드러운 페이드 전환 효과
  quoteTextEl.style.opacity = "0";
  quoteAuthorEl.style.opacity = "0";

  setTimeout(() => {
    quoteTextEl.textContent = `“${quote.text}”`;
    quoteAuthorEl.textContent = `— ${quote.author}`;
    quoteTextEl.style.opacity = "1";
    quoteAuthorEl.style.opacity = "1";
  }, 200);
}

// ==========================================================================
// 5. 실시간 시계 & 날짜
// ==========================================================================
function updateClock() {
  const timeEl = document.getElementById("current-time");
  const dateEl = document.getElementById("current-date");
  if (!timeEl || !dateEl) return;

  const now = new Date();
  
  // 시간 (HH:mm)
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  timeEl.textContent = `${hours}:${minutes}`;

  // 날짜 (YYYY년 M월 D일 요일)
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const dayName = days[now.getDay()];

  dateEl.textContent = `${year}년 ${month}월 ${date}일 (${dayName})`;
}

// ==========================================================================
// 6. 구글 검색 처리
// ==========================================================================
function setupSearch() {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const luckyBtn = document.getElementById("lucky-btn");

  if (form && input) {
    form.addEventListener("submit", (e) => {
      const query = input.value.trim();
      if (!query) {
        e.preventDefault();
        input.focus();
        return;
      }
      // 구글 검색 실행 (기본 동작으로 폼 제출됨)
    });
  }

  if (luckyBtn) {
    luckyBtn.addEventListener("click", () => {
      const luckyTopics = [
        "오늘의 날씨",
        "구글 두들 아카이브",
        "세계 불가사의",
        "우주 허블 망원경 사진",
        "영감을 주는 클래식 명곡",
        "제주도 가볼만한 곳",
        "서울 둘레길 코스"
      ];
      const randomTopic = luckyTopics[Math.floor(Math.random() * luckyTopics.length)];
      if (input) {
        input.value = randomTopic;
      }
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(randomTopic)}&btnI=I`;
    });
  }
}

// ==========================================================================
// 7. 다크 모드 / 라이트 모드 테마 관리
// ==========================================================================
function setupTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("google_startpage_theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    // 시스템 기본 설정 확인
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("google_startpage_theme", nextTheme);
    });
  }
}

// ==========================================================================
// 8. 초기화 실행
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 시계 시작
  updateClock();
  setInterval(updateClock, 1000);

  // 테마 설정
  setupTheme();

  // 검색 폼 설정
  setupSearch();

  // 명언 표시 및 버튼 이벤트
  displayRandomQuote();
  const refreshQuoteBtn = document.getElementById("refresh-quote-btn");
  if (refreshQuoteBtn) {
    refreshQuoteBtn.addEventListener("click", displayRandomQuote);
  }

  // 날씨 데이터 가져오기 및 새로고침 이벤트
  updateAllWeather();
  const refreshWeatherBtn = document.getElementById("refresh-weather-btn");
  if (refreshWeatherBtn) {
    refreshWeatherBtn.addEventListener("click", () => {
      updateAllWeather();
    });
  }

  // 30분마다 날씨 자동 갱신
  setInterval(updateAllWeather, 30 * 60 * 1000);
});
