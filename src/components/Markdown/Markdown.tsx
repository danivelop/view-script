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
	href: string
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
	code: ({ value }: RendererProps) => (
		<Styled.Code>
			<Styled.CodeIn>{value}</Styled.CodeIn>
		</Styled.Code>
	),
	paragraph: ({ children }: RendererProps) => (
		<Styled.Paragraph>{children}</Styled.Paragraph>
	),
	link: ({ children, href }: RendererProps) => (
		<Styled.Link href={href} target="_blank" rel="noopener noreferrer">
			{children}
		</Styled.Link>
	),
	listItem: ({ children }: RendererProps) => (
		<Styled.List>{children}</Styled.List>
	),
	tableCell: ({ children }: RendererProps) => (
		<Styled.TableCell>{children}</Styled.TableCell>
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
