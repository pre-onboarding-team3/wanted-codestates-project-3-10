# [Project2] 휴먼스케이프 과제

## 🚀 배포 링크

https://wanted-preonboarding-team3-humanscape.netlify.app/

## 💿 실행 방법

```cmd
$ git clone https://github.com/pre-onboarding-team3/wanted-codestates-project-3-10

$ npm install

$ npm run start
```

## 😎 3팀

- 김남경: styled-components, 화면 레이아웃, 검색 (팀장)
- 김경봉: redux 상태관리, 키보드 이동
- 김형욱: 세션 스토리지 API 호출 최적화, 키보드 이동
- 노학민: 디바운싱 구현, 키보드 이동
- 도지현: 배포 및 검색중 로딩 처리 
- 이산하: 추천 리스트 input 입력 후 검색, MD 작성



## 🎇사용 기술스택

- Javascript
- React
- Redux
- styled-components

- Axios



## 👩‍💻구현

### 검색

- 검색 + 검색어 추천 (검색어가 없거나, 검색 진행 중에 '검색 중' 표시)

  7개의 상위 키워드가 추천되도록 구현했습니다.
  
  api는 .env 파일에서 관리함으로 레포지토리에 올라가지 않도록 했습니다.

  ![질환명 검색](https://user-images.githubusercontent.com/82519180/155655116-c3bf92aa-4a5c-4c87-ab80-7fd9def0963e.gif)

- 키보드로 이동, 추천 리스트에서 엔터 후 검색

  `ArrowDown`, `ArrowUp`으로 키보드를 인식하고 현재 표시중인 인덱스를 `selected`로 가져와 엔터 입력시 value를 input에 넣고, 자동으로 검색이 진행되도록 구현했습니다.

  ![키보드 방향키 조작](https://user-images.githubusercontent.com/82519180/155655182-164d6fff-fcff-4879-9b03-d4d9bfc1b4b5.gif)

  ```js
  const pressKey = ({ key }) => {
      if (key === 'Enter') {
        inputRef.current.value = items[selected] ? items[selected].name : keyword
        dispatch(keyDown(inputRef.current.value))     
        searchClick(inputRef.current.value);
      } else if (key === 'ArrowDown') {
        setSelected((selected + 1) % 7);
      } else if (key === 'ArrowUp') {
        setSelected(selected - 1 >= 0 ? (selected - 1) % 7 : selected + 6);
      }
    };
  ```

  

- 추천 리스트에서 클릭 후 검색

  추천 리스트에서 아이템을 클릭하면 `dispatch`로 target.textContent를 보냅니다. 클릭시 자동으로 검색이 진행되도록 구현했습니다.

  ![마우스 클릭](https://user-images.githubusercontent.com/82519180/155655202-8f02aa2e-525c-4afc-be22-d16347f782a2.gif)

  ```js
  const clickKeyword = (e) => {
      dispatch(keyDown(e.target.textContent))
      searchClick(e.target.textContent);
    }
  ```

  ```js
  <ul>
      {items.map((item, index) => (
          <li
              key={index}
              className={index === selected ? 'selected' : ''}
              tabIndex="0"
              onClick={clickKeyword}
          >
      	<IoIosSearch color="black" size="20px" />
          <p>{item.name}</p>
  	</li>
  	))}
  </ul>
  ```

  

### API 호출 최적화

![로컬캐싱](https://user-images.githubusercontent.com/82519180/155655237-41222c77-a640-4547-a455-16a0401d9419.gif)

- 세션스토리지

  `sessionStorage.setItem`을 사용해 세션 스토리지에 검색 키워드를 저장하고, 세션이 유지되는 동안 같은 키워드로 검색 시 세션 스토리지에서 결과를 불러옵니다.

  공백을 없애 공백을 포함해 키워드를 검색했을 때에도 같은 value로 처리하도록 구현했습니다.

  ```js
  const writeSearchWord = async e => {
      //Todo : value에 공백이 추가된것도 같게본다. ex) '공   '와 '공' 전부
      const value = e.target.value.replace(/\s+$/gm, '');
      if (value === '') {
        setSelected(-1);
        dispatch(search([]));
      }
      // 캐시가 있을 때, 캐시 사용
      else if (sessionStorage.getItem(value)) {
        dispatch(search(JSON.parse(sessionStorage.getItem(value))));
      }
      // 없을 때 axios API 호출 => 세션 스토리 저장
      else if (value) {
        const URL = REACT_APP_SEARCH_API + value;
        const items = await axios.get(URL);
        sessionStorage.setItem(value, JSON.stringify(items.data.slice(0, 7)));
        dispatch(search(items.data.slice(0, 7)));
      }
      dispatch(keyDown(value));
    };
  ```

  

- 디바운싱 구현

  input이 change될 때마다 API를 호출하지 않고 0.4초의 시간 딜레이를 줘서 API 호출 횟수를 줄였습니다.

  ```js
  const debounce = (callback, delay) => {
      // callback => 일정 시간이 지난 후 실행되는 함수
      // delay => 지연 시간
      let timer;
      return (...args) => {
        // 실행할 함수(setTimeout())를 취소
        setHandleLoading(true);
        clearTimeout(timer);
  
        // delay가 지나면 callback 함수를 실행
        timer = setTimeout(() => {
          setHandleLoading(false);
          return callback(...args);
        }, delay);
      };
    };
  ```

  ```js
  <input
      onChange={debounce(writeSearchWord, 400)}
      ref={inputRef}
      type="text"
      onKeyDown={pressKey}
      placeholder="질환명을 입력해 주세요."
  />
  ```

  


## 💦구현하면서 어려웠던 점

- redux thunk / saga 사용하지 못해 Axios 호출 코드 구현이 아쉬웠습니다. API 호출을 action에 넣어 Redux를 통해 상태관리 할 수 있도록 리팩토링해볼 예정입니다.

- 로컬 캐싱의 expire time 개념이 불분명해 로컬 스토리지/세션 스토리지를 사용해 api 호출 횟수를 최적화하는 것이 맞는지 어려웠습니다.

- redux를 사용할 때, useState와 redux store 사용을 분류하는 기준이 모호하다 느꼈습니다.

  
