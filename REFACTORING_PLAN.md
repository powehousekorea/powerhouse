# 🔧 프로젝트 리팩토링 개선 제안서

**작성일:** 2025-12-02  
**분석자:** 시니어 테크 리드  
**프로젝트:** Powerhouse Korea Website

---

## 📊 1. 프로젝트 현황 분석

### 1.1 발견된 주요 문제점

#### 🔴 Critical Issues (즉시 해결 필요)

1. **코드 중복 (Code Duplication)**
   - `src/app/activities/[slug]/page.tsx`와 `src/app/news/[slug]/page.tsx`가 95% 동일한 코드
   - `src/app/activities/page.tsx`와 `src/app/news/page.tsx`가 거의 동일한 구조
   - **영향:** 유지보수 비용 증가, 버그 발생 시 두 곳 모두 수정 필요

2. **Dead Code (사용되지 않는 코드)**
   - `src/components/features/link-preview-card.tsx` - 어디서도 import되지 않음
   - `src/lib/metadata.ts` - `link-preview-card.tsx`에서만 사용되므로 함께 제거 가능
   - **영향:** 번들 크기 증가, 혼란 야기

3. **프로덕션 코드에 디버그 코드 남아있음**
   - `src/app/activities/[slug]/page.tsx`에 `console.log` 2개
   - **영향:** 성능 저하, 보안 정보 노출 가능성

#### 🟡 Medium Issues (우선순위 높음)

4. **불필요한 디렉토리**
   - `--verbose/` 폴더 - 사용되지 않는 것 같음 (확인 필요)
   - `web/` 폴더 - 별도 프로젝트인지 확인 필요

5. **스크립트 파일 정리 필요**
   - `scripts/` 폴더에 일회성 작업용 스크립트 다수
   - 완료된 작업의 스크립트는 문서화 후 보관 또는 삭제 고려

6. **타입 안정성 부족**
   - 여러 곳에서 `any` 타입 사용 (`post: any`, `block: any` 등)
   - **영향:** 타입 안정성 저하, 런타임 에러 가능성

#### 🟢 Low Issues (점진적 개선)

7. **구조적 개선 여지**
   - Post 상세 페이지 렌더링 로직이 중복됨
   - 공통 컴포넌트로 추출 가능

---

## 🎯 2. 리팩토링 계획

### Phase 1: Dead Code 제거 및 정리 (우선순위: 높음)

#### 2.1 삭제 대상 파일

**확인 필요:**
- [ ] `src/components/features/link-preview-card.tsx` - 사용되지 않음
- [ ] `src/lib/metadata.ts` - `link-preview-card.tsx`에서만 사용
- [ ] `--verbose/` 폴더 전체 - 사용 여부 확인 필요
- [ ] `web/` 폴더 - 별도 프로젝트인지 확인 필요

**삭제 확정:**
- ✅ `src/components/features/link-preview-card.tsx` (사용되지 않음 확인)
- ✅ `src/lib/metadata.ts` (사용되지 않음 확인)

#### 2.2 정리 대상

- `scripts/` 폴더의 일회성 작업 스크립트들
  - 완료된 작업: `remove-duplicates.ts`, `remove-title-prefix.ts`, `delete-activities.ts` 등
  - 보관: `upload-to-sanity.ts`, `scrape-activities.ts` (재사용 가능)

### Phase 2: 코드 중복 제거 (우선순위: 높음)

#### 2.3 공통 컴포넌트 생성

**생성할 파일:**
- `src/components/features/post-detail-page.tsx` - Post 상세 페이지 공통 컴포넌트
- `src/components/features/post-list-page.tsx` - Post 목록 페이지 공통 컴포넌트 (또는 기존 컴포넌트 활용)

**수정할 파일:**
- `src/app/activities/[slug]/page.tsx` → 공통 컴포넌트 사용
- `src/app/news/[slug]/page.tsx` → 공통 컴포넌트 사용
- `src/app/activities/page.tsx` → 공통 컴포넌트 사용
- `src/app/news/page.tsx` → 공통 컴포넌트 사용

### Phase 3: 타입 안정성 개선 (우선순위: 중간)

#### 2.4 타입 정의 추가

**생성할 파일:**
- `src/types/post.ts` - Post 관련 타입 정의
- `src/types/sanity.ts` - Sanity 관련 타입 정의

**수정할 파일:**
- 모든 `any` 타입을 구체적인 타입으로 변경

### Phase 4: 코드 품질 개선 (우선순위: 중간)

#### 2.5 디버그 코드 제거

- `src/app/activities/[slug]/page.tsx`의 `console.log` 제거
- 에러 핸들링 개선

#### 2.6 구조 개선

- Post 렌더링 로직을 별도 유틸리티로 분리
- 날짜 포맷팅 로직 통일

---

## 📋 3. 상세 실행 계획

### Step 1: Dead Code 제거 (안전, 즉시 실행 가능)

**작업 내용:**
1. `link-preview-card.tsx` 사용 여부 최종 확인
2. `metadata.ts` 사용 여부 최종 확인
3. 사용되지 않으면 삭제
4. `--verbose/` 폴더 확인 후 삭제

**예상 시간:** 10분  
**위험도:** 낮음 (사용되지 않는 코드)

### Step 2: 공통 컴포넌트 생성 (핵심 리팩토링)

**작업 내용:**
1. `PostDetailPage` 컴포넌트 생성
   - `activities/[slug]`와 `news/[slug]`의 공통 로직 추출
   - 카테고리별 차이점만 props로 전달
2. `PostListPage` 컴포넌트 생성 또는 기존 컴포넌트 활용
   - `activities/page`와 `news/page`의 공통 로직 추출
3. 기존 페이지들을 공통 컴포넌트 사용하도록 수정

**예상 시간:** 1-2시간  
**위험도:** 중간 (기능 테스트 필수)

### Step 3: 타입 정의 추가

**작업 내용:**
1. Post 타입 정의
2. Sanity Block 타입 정의
3. 모든 `any` 타입을 구체 타입으로 변경

**예상 시간:** 1시간  
**위험도:** 낮음 (점진적 개선)

### Step 4: 코드 품질 개선

**작업 내용:**
1. `console.log` 제거
2. 에러 핸들링 개선
3. Post 렌더링 로직 유틸리티화

**예상 시간:** 30분  
**위험도:** 낮음

---

## ⚠️ 4. 주의사항 및 리스크 관리

### 4.1 기능 유지 보장

- 모든 리팩토링 후 기능 테스트 필수
- 특히 Post 상세 페이지와 목록 페이지 동작 확인
- URL 라우팅 정상 작동 확인

### 4.2 단계적 진행

- 한 번에 모든 것을 바꾸지 않음
- 각 Phase별로 테스트 후 다음 단계 진행
- Git 커밋을 단계별로 분리하여 롤백 가능하도록

### 4.3 교차 검증

- 파일 삭제 전 grep으로 사용 여부 재확인
- Import 문 정리 후 빌드 테스트
- 타입 변경 후 타입 체크 통과 확인

---

## 📈 5. 예상 효과

### 5.1 코드 품질

- **코드 중복:** 약 200줄 감소 예상
- **Dead Code:** 약 100줄 제거
- **타입 안정성:** `any` 타입 10개 이상 → 0개

### 5.2 유지보수성

- Post 관련 기능 수정 시 1곳만 수정하면 됨
- 버그 발생 시 수정 범위 축소
- 신규 개발자 온보딩 시간 단축

### 5.3 성능

- 번들 크기 감소 (Dead Code 제거)
- 불필요한 console.log 제거로 성능 향상

---

## ✅ 6. 실행 승인 체크리스트

리팩토링을 시작하기 전에 다음 사항을 확인해주세요:

- [ ] 현재 프로젝트가 정상 작동 중인지 확인
- [ ] Git 저장소에 현재 상태 커밋 및 백업
- [ ] 리팩토링 계획 검토 및 승인
- [ ] 각 Phase별 테스트 계획 수립

---

## 🚀 7. 다음 단계

승인 후 다음 순서로 진행:

1. **Phase 1 실행** - Dead Code 제거 (가장 안전)
2. **Phase 2 실행** - 코드 중복 제거 (핵심)
3. **Phase 3 실행** - 타입 안정성 개선
4. **Phase 4 실행** - 코드 품질 개선

각 Phase 완료 후 테스트 및 검토를 진행합니다.

---

**문의사항이나 수정 요청이 있으시면 알려주세요.**

