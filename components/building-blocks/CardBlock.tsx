"use client";

import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface CardBlockProps {
  padding?: any;
  margin?: any;
  borderRadius?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  shadow?: "none" | "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  direction?: "row" | "column";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: number;
  justify?: "start" | "center" | "end" | "between";
  align?: "start" | "center" | "end";
  children?: ReactNode;
  className?: string;
  nodeId?: string;
  isEditor?: boolean;
}

export function CardBlock({
  padding = { all: '16px', top: '16px', right: '16px', bottom: '16px', left: '16px' },
  margin = { all: '0px', top: '0px', right: '0px', bottom: '0px', left: '0px' },
  borderRadius = 2,
  backgroundColor = "#ffffff",
  borderColor = "#e5e7eb",
  borderWidth = 1,
  shadow = "md",
  width = "auto",
  height = "auto",
  direction = "column",
  wrap = "nowrap",
  gap = 4,
  justify = "start",
  align = "start",
  children,
  className,
  nodeId,
  isEditor = true,
}: CardBlockProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: nodeId || "card-block",
    data: {
      accepts: ["content", "building-block"],
    },
  });

  const shadowClass = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  }[shadow];

  const borderRadiusPx = borderRadius * 4;

  const justifyClass = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  }[justify] || "justify-start";

  const alignClass = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  }[align] || "items-start";

  // Helper to get spacing value
  const getSpacing = (val: any, side: string) => {
    if (typeof val === 'number') return `${val * 4}px`; // Backward compat
    if (typeof val === 'string') return val; // Simple string
    if (typeof val === 'object') return val[side] || val.all || '0px';
    return '0px';
  };

  const cardStyle: React.CSSProperties = {
    paddingTop: getSpacing(padding, 'top'),
    paddingRight: getSpacing(padding, 'right'),
    paddingBottom: getSpacing(padding, 'bottom'),
    paddingLeft: getSpacing(padding, 'left'),
    marginTop: getSpacing(margin, 'top'),
    marginRight: getSpacing(margin, 'right'),
    marginBottom: getSpacing(margin, 'bottom'),
    marginLeft: getSpacing(margin, 'left'),
    borderRadius: `${borderRadiusPx}px`,
    backgroundColor,
    borderColor,
    borderWidth: `${borderWidth}px`,
    borderStyle: "solid",
    gap: `${gap * 4}px`,
  };

  if (width !== "auto") {
    cardStyle.width = typeof width === "number" ? `${width}px` : width;
  }
  if (height !== "auto") {
    cardStyle.height = `${height}px`;
  }

  const directionClass = direction === "row" ? "flex-row" : "flex-col";
  const wrapClass = wrap === "wrap" ? "flex-wrap" : wrap === "wrap-reverse" ? "flex-wrap-reverse" : "flex-nowrap";

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex",
        directionClass,
        wrapClass,
        justifyClass,
        alignClass,
        shadowClass,
        // Show drop zone styling in editor mode
        isEditor && isOver && "ring-2 ring-green-400",
        className,
      )}
      style={cardStyle}
    >
      {children ||
        (isEditor && (
          <div className="text-sm text-gray-400 italic text-center p-4 border border-dashed border-gray-300 rounded">
            Drop content components here
          </div>
        ))}
    </div>
  );
}
