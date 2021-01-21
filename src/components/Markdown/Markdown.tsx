/* eslint-disable react/display-name */
/* External dependencies */
import React from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

/* Internal dependencies */
import * as Styled from './Markdown.styled'

interface MarkdownProps {
	markdown: string
}

interface RendererProps {
	level: 1 | 2 | 3 | 4 | 5 | 6
	value: string
	children: React.ReactChildren
}

const renderers = {
	inlineCode: ({ value }: RendererProps) => (
		<Styled.InlineCode>{value}</Styled.InlineCode>
	),
	thematicBreak: () => <Styled.Break />,
	heading: ({ level, children }: RendererProps) => (
		<Styled.Heading as={`h${level}` as any}>{children}</Styled.Heading>
	),
	blockquote: ({ children }: RendererProps) => (
		<Styled.Blockquote>{children}</Styled.Blockquote>
	),
}

function Markdown({ markdown }: MarkdownProps) {
	return (
		<Styled.Container>
			<ReactMarkdown plugins={[gfm]} renderers={renderers}>
				{markdown}
			</ReactMarkdown>
		</Styled.Container>
	)
}

export default Markdown
