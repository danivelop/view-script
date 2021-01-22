export interface EventPropertyType {
	property: string
	description: string
}

export const eventProperties: EventPropertyType[] = [
	{
		property: 'window vs document',
		description: `
## window vs document
window와 document는 모두 브라우저가 제공하는 \`자바스크립트 내장객체\`입니다.
window객체는 아래와 같은 구성요소를 가집니다

![window](http://www.ktword.co.kr/img_data/5991_1.JPG)

출처 - http://www.ktword.co.kr/abbr_view.php?nav=&m_temp1=5991&id=51

### window
브라우저 객체 모델(BOM: Browser Object Model)의 최상위 객체

### document
문서 객체 모델(DOM: Document Object Model)의 최상위 객체

> window안에 document요소가 있으며 window는 웹브라우처 창 그자체이고 document는 브라우저 안에 있는 문서
    `,
	},
	{
		property: 'window.scrollX',
		description: `
## window.scrollX
화면의 왼쪽 위를 기준으로 현재 **문서**가 스크롤 된 X축의 값.
\`window.pageXOffset\`의 별칭으로 \`window.scrollX === window.pageXOffset\`는 항상 \`true\`

> 여기서 말하는 \`문서\`는 브라우저의 모드에 따라 다름. 뒤에서 설명

> IE에서는 지원을 하지 않으므로 IE에서는 \`window.pageXOffset\`를 사용해야함. IE9 미만에서는 \`window.pageXOffset\`도 동작안함.
    `,
	},
	{
		property: 'window.scrollY',
		description: `
## window.scrollY
화면의 왼쪽 위를 기준으로 현재 **문서**가 스크롤 된 Y축의 값
\`window.pageYOffset\`의 별칭으로 \`window.scrollY === window.pageYOffset\`는 항상 \`true\`

> 여기서 말하는 \`문서\`는 브라우저의 모드에 따라 다름. 뒤에서 설명

> IE에서는 지원을 하지 않으므로 IE에서는 \`window.pageYOffset\`를 사용해야함. IE9 미만에서는 \`window.pageYOffset\`도 동작안함.
    `,
	},
	{
		property: 'window.innerWidth',
		description: `
## window.innerWidth
화면의 viewport영역의 내부너비

> IE에서는 스크롤영역을 제외한 너비가 나옴
		`,
	},
	{
		property: 'window.innerHeight',
		description: `
## window.innerHeight
화면의 viewport영역의 내부높이

> mobile safari에서는 키보드가 열려도 viewport영역을 재조정 해주지 않음.
\`\`\`javascript
// mobile safari에서 키보드 열기전
console.log(window.innerHeight) // 612

// 키보드 열린후
console.log(window.innerHeight) // 612
\`\`\`
\`window.visualViewport.height\`를 사용하면 mobile safari에서 키보드 열린후에도 정상적인 height값을 얻을수 있다.
		`,
	},
	{
		property: 'window.outerWidth',
		description: `
## window.outerWidth

윈도우의 사이드바와 경계선을 포함한 바깥영역의 너비
		`,
	},
	{
		property: 'window.outerHeight',
		description: `
## window.outerHeight

윈도우의 상단 사이드바, 탭 등을 포함한 윈도우 창 자체의 높이

> mobile chrome는 상단 사이드바 등의 영역을 따로 계산해주지 않아 \`window.outerHeight === window.innerHeight\`이다.

> mobile safari는 상단 사이드바 및 safe-area의 영역까지 다같이 계산해준다.
		`,
	},
	{
		property: 'window.scrollTo(x, y)',
		description: `
## window.scrollTo(x, y)

x좌표와 y좌표를 매개변수로 받아 문서(document)의 스크롤을 이동시키는 함수.

x좌표, y좌표는 각각 문서 왼쪽상단부터 시작하는 **픽셀**단위의 값
		`,
	},
	{
		property: 'window.screenLeft',
		description: `
## window.screenLeft

컴퓨터 화면에서 현재 윈도우창이 위치하고 있는곳의 픽셀단위의 X좌표값

> 모바일에서는 항상 0
		`,
	},
	{
		property: 'window.screenTop',
		description: `
## window.screenTop

컴퓨터 화면에서 현재 윈도우창이 위치하고 있는곳의 픽셀단위의 Y좌표값

> 모바일에서는 항상 0
		`,
	},
	{
		property: 'document.documentElement',
		description: `
## document.documentElement

document의 element형태를 반환. 즉,
\`\`\`html
<html>
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
\`\`\`
와 같은 html을 반환
		`,
	},
	{
		property: 'document.scrollingElement',
		description: `
## document.scrollingElement

document에서 scroll요소의 element를 반환.
표준 모드(대부분의 브라우저에 해당)에서는 \`document.documentElement\`와 같이
\`\`\`html
<html>
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
\`\`\`
와 같은 html을 반환함. 하지만 호환모드에서는 body를 반환
		`,
	},
	{
		property: '표준모드 | 호환모드',
		description: `
## 표준모드 | 호환모드

W3C에서 웹표준을 제정할 당시, 기존에 있던 웹사이트들은 해당 표준을 자기네 웹사이트에 반영하기까지 \
시간이 걸렸으니 표준을 반영하지 않은 호환모드와 포준을 반영한 표준모드로 두가지 방식의 모드를 제공했다.
호환모드와 표준모드는 정의된 표준이 다르기 때문에 동작도 달라짐에 주의

### 표준모드와 호환모드를 판단하는 기준

문서를 정의할 때

\`\`\`html
<!DOCTYPE html>
<html lang="ko">
  <head></head>
  <body>
    ...
  </body>
</html>
\`\`\`

과 같이 상단에 \`<!DOCTYPE html>\`를 적어주게 되면 브라우저는 표준모드로 렌더링함.
따라서 \`<!DOCTYPE html>\`는 꼭 적어주기!

---

[포준모드 및 호환모드에 대한 아주 자세한 문서](https://hsivonen.fi/doctype/)
		`,
	},
	{
		property: 'element.scrollLeft',
		description: `
## element.scrollLeft

element가 해당 element의 왼쪽 위를 기준으로 스크롤된 픽셀단위의 X좌표값.

해당 element가 스크롤이 불가능한 요소라면 0을 리턴함

---

number값을 넣어 해당 element의 스크롤을 이동시킬 수 있음

ex)
\`\`\`javascript
element.scrollLeft = number
\`\`\`
		`,
	},
	{
		property: 'element.scrollTop',
		description: `
## element.scrollTop

element가 해당 element의 왼쪽 위를 기준으로 스크롤된 픽셀단위의 Y좌표값.

해당 element가 스크롤이 불가능한 요소라면 0을 리턴함

---

number값을 넣어 해당 element의 스크롤을 이동시킬 수 있음

ex)
\`\`\`javascript
element.scrollTop = number
\`\`\`
		`,
	},
	{
		property: 'element.scrollHeight',
		description: `
## element.scrollHeight

scroll영역을 합친 element의 높이
		`,
	},
	{
		property: 'element.clientWidth',
		description: `
## element.clientWidth

element의 스크롤바, border, margin영역을 제외한 너비

![clientWidth](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth/dimensions-client.png)
		`,
	},
	{
		property: 'element.clientHeight',
		description: `
## element.clientHeight

element의 border, margin영역을 제외한 높이

![clientHeight](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth/dimensions-client.png)
		`,
	},
	{
		property: '절대좌표와 상대좌표',
		description: `
## 절대좌표와 상대좌표

### 상대좌표

상대좌표에 관련된 속성
1. \`element.offsetLeft\`, \`element.offsetTop\`
2. \`element.getBoundingClientRect()\`
	- \`width\`, \`height\`, \`top\`, \`left\`, \`right\`, \`bottom\`

---
	
- \`element.offsetLeft\` \`element.offsetTop\`
position이 \`relative\`인 부모중 가장 가까운 부모를 기준으로 한 상대좌표를 나타낸다

부모 element중 \`relative\`인것을 찾는데 만약 부모 element가 전부 \`relative\`가 \
아니라면 결국 문서의 시작지점 으로부터의 좌표 즉, 절대좌표를 나타내게 된다.

---

\`element.getBoundingClientRect()\`

- \`top\`, \`left\`, \`right\`, \`bottom\`
viewport를 기준으로한 좌표값을 나타낸다

- \`width\`, \`height\`
element의 크기를 나타낸다. element.clientWidth 등과 다른점은 border영역을 포함하며 소수점까지 계산이 된다.

### 절대좌표

element의 문서에 대한 절대좌표는 스크롤영역과 해당 element의 viewport기준 상대좌표로 구할수 있다
\`\`\`javascript
const absoluteLeft = window.pageXOffset + element.getBoundingClientRect().left
const absoluteTop = window.pageYOffset + element.getBoundingClientRect().top
\`\`\`

> offset관련 속성은 호출시 정확한 값을 계산하기 위해 dom전체를 reflow하기 때문에 주의해서 사용!
		`,
	},
	{
		property: 'IntersectionObserver',
		description: `
## IntersectionObserver

viewport와 element를 관찰하며 element가 화면에서 영역 바깥으로 벗어나거나 다시 화면으로 들어오는 등의 시점을 구별할 수 있다.

\`new IntersectionObserver(callback[, options])\`

### option

|name|type|description|
|--|--|--|
|root|HTMlElement|해당 root를 기준으로 경계선을 관찰한다|
|rootMargin|string|root element의 경계선에 margin을 넣을수 있다. css와 방식은 동일|
|threshold|number|0.0 ~ 1.0 값. 0.0은 대상 element가 단일 픽셀이라도 보일때 callback실행하고 1.0은 대상 element 전체가 대상요소가 됨|


### code example
\`\`\`javascript
function callback([entry]) {
  entry.isIntersecting // true: 화면영역에 있음, false: 화면영역을 벗어남
}

const observer = new IntersectionObserver(callback, {
  threshold: 0.0
})

observer.observe(element)
//observer.disconnect()  // 더 이상 필요없을때 연결해제 필요
\`\`\`
		`,
	},
]

export function getEventPropertyValue(property: string, layoutRef: any) {
	const { documentRef, windowRef, elementRef } = layoutRef.current

	switch (property) {
		case 'window.scrollX':
			return documentRef?.current && documentRef.current.scrollLeft
		case 'window.scrollY':
			return documentRef?.current && documentRef.current.scrollTop
		case 'window.innerWidth':
			return documentRef?.current && documentRef.current.clientWidth
		case 'window.innerHeight':
			return documentRef?.current && documentRef.current.clientHeight
		case 'window.outerWidth':
			return (
				windowRef?.current && windowRef.current.getBoundingClientRect().width
			)
		case 'window.outerHeight':
			return (
				windowRef?.current && windowRef.current.getBoundingClientRect().height
			)
		case 'window.screenLeft':
			return window.screenLeft
		case 'window.screenTop':
			return window.screenTop
		case 'document.documentElement':
			return document.documentElement.tagName
		case 'document.scrollingElement':
			return document.scrollingElement?.tagName
		case 'element.scrollLeft':
			return documentRef?.current && documentRef.current.scrollLeft
		case 'element.scrollTop':
			return documentRef?.current && documentRef.current.scrollTop
		case 'element.scrollHeight':
			return documentRef?.current && documentRef.current.scrollHeight
		case '절대좌표와 상대좌표':
			if (!elementRef.current || !documentRef.current) {
				return null
			}

			return [
				`element.offsetLeft: ${elementRef.current.offsetLeft}`,
				`element.offsetTop: ${elementRef.current.offsetTop}`,
				`element.getBoundingClientRect().width: ${
					elementRef.current.getBoundingClientRect().width
				}`,
				`element.getBoundingClientRect().height: ${
					elementRef.current.getBoundingClientRect().height
				}`,
				`element.getBoundingClientRect().top: ${
					elementRef.current.getBoundingClientRect().top -
					documentRef.current.getBoundingClientRect().top
				}`,
				`element.getBoundingClientRect().left: ${
					elementRef.current.getBoundingClientRect().left -
					documentRef.current.getBoundingClientRect().left
				}`,
				`element.getBoundingClientRect().right: ${
					elementRef.current.getBoundingClientRect().right -
					documentRef.current.getBoundingClientRect().left
				}`,
				`element.getBoundingClientRect().bottom: ${
					elementRef.current.getBoundingClientRect().bottom -
					documentRef.current.getBoundingClientRect().top
				}`,
			]
		default:
			return null
	}
}
