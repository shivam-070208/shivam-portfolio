/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC } from "react";
import parse from "html-react-parser";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, Document } from "@contentful/rich-text-types";
import Image from "next/image";

type RichContentRendererProps = {
  nodes: any[];
  documentStyle?: Record<string, unknown>;
};

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p>{children}</p>,
    [BLOCKS.HEADING_1]: (node: any, children: any) => <h1>{children}</h1>,
    [BLOCKS.HEADING_2]: (node: any, children: any) => <h2>{children}</h2>,
    [BLOCKS.HEADING_3]: (node: any, children: any) => <h3>{children}</h3>,
    [BLOCKS.UL_LIST]: (node: any, children: any) => <ul>{children}</ul>,
    [BLOCKS.OL_LIST]: (node: any, children: any) => <ol>{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote>{children}</blockquote>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { title, description, file } = node.data.target.fields || {};
      const src = file?.url || "";
      if (!src) return null;
      return (
        <span style={{ display: "block", maxWidth: "100%" }}>
          <Image
            src={src.startsWith("http") ? src : `https:${src}`}
            alt={description || title || ""}
            style={{ maxWidth: "100%", borderRadius: "0.5rem" }}
            width={800}
            height={450}
            sizes="100vw"
            className="rounded-lg"
          />
        </span>
      );
    },
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline dark:text-blue-400">
        {children}
      </a>
    ),
  },
};

const renderWixNode = (node: any, idx = 0): React.ReactNode => {
  const children = Array.isArray(node.nodes)
    ? node.nodes.map((child: any, childIdx: number) =>
        renderWixNode(child, childIdx)
      )
    : node.textData?.text || "";

  const styledText = (text: string) => {
    if (!Array.isArray(node.textData?.decorations)) return text;

    return node.textData.decorations.reduce(
      (acc: React.ReactNode, decoration: any) => {
        if (!acc) return null;
        const textValue = typeof acc === "string" ? acc : acc;

        switch (decoration.type) {
          case "BOLD":
            return <strong key={`${idx}-bold`}>{acc}</strong>;
          case "ITALIC":
            return <em key={`${idx}-italic`}>{acc}</em>;
          case "UNDERLINE":
            return <u key={`${idx}-underline`}>{acc}</u>;
          case "LINK":
            return (
              <a
                key={`${idx}-link`}
                href={decoration.linkData?.link?.url || "#"}
                target="_blank"
                rel="noreferrer noopener">
                {acc}
              </a>
            );
          default:
            return acc;
        }
      },
      text
    );
  };

  const contentChildren = Array.isArray(node.nodes)
    ? children
    : styledText(node.textData?.text || "");

  switch (node.type) {
    case "HEADING":
      return (
        <p
          key={idx}
          className="my-2 text-xl leading-tight font-semibold text-neutral-900 dark:text-neutral-100">
          {contentChildren}
        </p>
      );
    case "SUBHEADING":
      return (
        <p
          key={idx}
          className="my-1.5 text-base leading-tight font-semibold text-neutral-800 dark:text-neutral-200">
          {contentChildren}
        </p>
      );
    case "PARAGRAPH":
      return (
        <p
          key={idx}
          className="mt-1 mb-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {contentChildren}
        </p>
      );
    case "BULLETED_LIST":
      return <ul key={idx}>{contentChildren}</ul>;
    case "ORDERED_LIST":
      return <ol key={idx}>{contentChildren}</ol>;
    case "LIST_ITEM":
      return <li key={idx}>{contentChildren}</li>;
    case "QUOTE":
      return <blockquote key={idx}>{contentChildren}</blockquote>;
    case "LINK":
      return (
        <a
          key={idx}
          href={node.url || "#"}
          target="_blank"
          rel="noreferrer noopener">
          {contentChildren}
        </a>
      );
    case "IMAGE":
      return node.src ? (
        <Image
          key={idx}
          src={node.src}
          alt={node.alt || ""}
          width={node.width || 800}
          height={node.height || 450}
        />
      ) : null;
    case "TEXT":
      return <>{styledText(node.textData?.text || "")}</>;
    default:
      return <div key={idx}>{contentChildren}</div>;
  }
};

const RichContentRenderer: FC<RichContentRendererProps> = ({ nodes }) => {
  if (!nodes || (Array.isArray(nodes) && !nodes.length)) {
    return <p>No content.</p>;
  }

  if (
    Array.isArray(nodes) &&
    nodes.some((node) => typeof node === "object" && node.type)
  ) {
    return (
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {nodes.map((node, idx) => renderWixNode(node, idx))}
      </div>
    );
  }

  const richDoc: Document = Array.isArray(nodes)
    ? { nodeType: BLOCKS.DOCUMENT, data: {}, content: nodes }
    : nodes &&
        typeof nodes === "object" &&
        Array.isArray((nodes as any).content)
      ? (nodes as Document)
      : ({ nodeType: BLOCKS.DOCUMENT, data: {}, content: [] } as Document);

  if (!richDoc || !Array.isArray(richDoc.content) || !richDoc.content.length)
    return <p>No content.</p>;

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {documentToReactComponents(richDoc, options)}
    </div>
  );
};

export default RichContentRenderer;
