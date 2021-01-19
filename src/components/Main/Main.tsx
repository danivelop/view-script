/* External dependencies */
import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

/* Internal dependencies */
import * as Styled from './Main.styled'

interface RendererProps {
	level: 1 | 2 | 3 | 4 | 5 | 6
	value: string
	children: React.ReactChildren
}

const renderers = {
	inlineCode: ({ value }: RendererProps) => <Styled.InlineCode>{value}</Styled.InlineCode>,
	thematicBreak: () => <Styled.Break />,
	heading: ({ level, children }: RendererProps) => <Styled.Heading as={`h${level}` as any}>{children}</Styled.Heading>,
	blockquote: ({ children }: RendererProps) => <Styled.Blockquote>{children}</Styled.Blockquote>,
}

const markdown = `
  # view-script
  ---

  ## content
  - [window vs document](#WindowVsDocument)
  - [scroll](#Scroll)

  ---

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

  ## window
  window.innerWidth: 수직스크롤바를 포함한 viewport의 너비 
`

function Main() {
	const [innerWidth, setInnerWidth] = useState(window.innerWidth)

	useEffect(() => {
		window.addEventListener('resize', () => {
			setInnerWidth(window.innerWidth)
		})
	}, [])

	return (
		<Styled.Container>
			<ReactMarkdown plugins={[gfm]} renderers={renderers} children={markdown} />
			{innerWidth}
		</Styled.Container>
	)
}

export default Main
