# TAILWIND CSS

1. HeaderLink에서 밑줄 표현할때 `calc(100%+20px)` 을 썼다. 이렇게 하면 text의 크기에 따라서 밑줄의 크기가 변하므로 매우 스마트하게 스타일링을 할 수 있다.

2. tailwind에서는 custom class기능을 제공한다. global.css에서 @layer Components에서 custom가능

3. `min-width:max-content` --> prevent size from shrinking

4. 부모에 `group` 클래스를 추가하고 특정 자식에 `group-hover:text-white` 라고 하면 마우스를 올렸을 때 그 자식의 text색깔만 흰색으로 바뀐다.

# TYPESCRIPT

# NEXT JS

1. image src가 svg를 불러온다면 next.config.js에서 아래 PROP을 추가해라

```JSON
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
```

2. NEXT AUTH의 expire를 늘리고 싶다면 `refetchInterval` 또는 `max age`를 검색해보거라

3. ServerSide Cycle
   - Next Server가 GET 요청을 받는다. -요청에 맞는 Page를 찾는다.
   - \_app.js의 getInitialProps가 있다면 실행한다.
   - Page Component의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
   - \_document.js의 getInitialProps가 있다면 실행한다. pageProps들을 받아온다.
   - 모든 props들을 구성하고, \_app.js > page Component 순서로 rendering.
   - 모든 Content를 구성하고 \_document.js를 실행하여 html 형태로 출력한다.

위의 과정으로 server logic이 실행이 된다. 이 순서가 가끔 헷갈려서 서버 상에 로직이 생각과 다르게 진행되는 경우가 많다. 브라우저 console에도 안찍히는 로직이므로, 디버깅이 어렵다는 단점도 있다.

출처:https://velog.io/@cyranocoding/Next-js-%EA%B5%AC%EB%8F%99%EB%B0%A9%EC%8B%9D-%EA%B3%BC-getInitialProps
결국 \_app.js는 server에서 실행이 되는군. 그럼 여기 useSession도 서버에서 실행이 되는군.

4. \_app.tsx의 pageProps는 말그대로 모든 page 컴포넌트에 넘어오는 parameter를 의미하는군. 즉, Home page에서 apple이라는 prop을 serverSideProp 함수로 넘겨주면 \_app.tsx에서 pageProps로 받을 수 있다는 말이다.

# 궁금증, 할일

1. dark 모드로 바꾸면 dom안에 어느 element의 클래스가 바뀌는 걸까?

   - next themes랑 tailwind가 서로 어떻게 협력을 하는 것일까?
