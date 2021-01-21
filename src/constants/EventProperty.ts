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
  화면의 왼쪽 위를 기준으로 현재 스크롤 된 X축의 값
    `,
	},
	{
		property: 'window.scrollY',
		description: `
  ## window.scrollX
  화면의 왼쪽 위를 기준으로 현재 스크롤 된 Y축의 값
    `,
	},
]

export const validPropertyValues = ['window.scrollX', 'window.scrollY']

export function getEventPropertyValue(element: any, property: string) {
	switch (property) {
		case 'window.scrollX':
			return element.scrollLeft
		case 'window.scrollY':
			return element.scrollTop
		default:
			return null
	}
}
