# CSS

1. HeaderLink에서 밑줄 표현할때 `calc(100%+20px)` 을 썼다. 이렇게 하면 text의 크기에 따라서 밑줄의 크기가 변하므로 매우 스마트하게 스타일링을 할 수 있다.

2. tailwind에서는 custom class기능을 제공한다. global.css에서 @layer Components에서 custom가능

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

# 궁금증, 할일

1. dark 모드로 바꾸면 dom안에 어느 element의 클래스가 바뀌는 걸까?
