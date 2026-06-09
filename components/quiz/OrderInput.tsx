"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { Choice } from "@/lib/content/types";

function Row({
  choice,
  index,
  state,
  disabled,
}: {
  choice: Choice;
  index: number;
  state: "neutral" | "correct" | "wrong";
  disabled: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: choice.id, disabled });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };
  const ring =
    state === "correct"
      ? "border-success/60 bg-success/10"
      : state === "wrong"
        ? "border-destructive/60 bg-destructive/10"
        : "border-border bg-card";
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-lg border p-3 ${ring}`}
    >
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary font-mono text-xs tnum text-muted-foreground">
        {index + 1}
      </span>
      <span className="flex-1 text-sm text-foreground">{choice.text}</span>
      {!disabled && (
        <button
          type="button"
          className="cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function OrderInput({
  choices,
  order,
  onChange,
  disabled,
  correctOrder,
}: {
  choices: Choice[];
  order: string[];
  onChange: (order: string[]) => void;
  disabled: boolean;
  /** When set (post-submit), color rows by whether they're in the right slot. */
  correctOrder?: string[];
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const byId = new Map(choices.map((c) => [c.id, c]));

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = order.indexOf(String(active.id));
    const newIndex = order.indexOf(String(over.id));
    onChange(arrayMove(order, oldIndex, newIndex));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {order.map((id, i) => {
            const state: "neutral" | "correct" | "wrong" = correctOrder
              ? correctOrder[i] === id
                ? "correct"
                : "wrong"
              : "neutral";
            return (
              <Row
                key={id}
                choice={byId.get(id)!}
                index={i}
                state={state}
                disabled={disabled}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
