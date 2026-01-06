"use client";

import { Button, Card } from "antd";

interface NoteCardProps {
  title: string;
  content: string;
  archived: boolean;
  onToggleArchive?: () => void;
}

export default function NoteCard({
  title,
  content,
  archived,
  onToggleArchive,
}: NoteCardProps) {
  return (
    <Card
      hoverable
      style={{
        position: "relative",
        borderRadius: 16,
        boxShadow: "0 6px 18px rgba(0,0,0,0.10)",
      }}
    >
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>

      {/* kasih ruang supaya teks tidak ketabrak tombol */}
      <p className="mt-3 text-base text-gray-600" style={{ paddingRight: 120, paddingBottom: 64 }}>
        {content}
      </p>

      <Button
        onClick={onToggleArchive}
        style={{
          position: "absolute",
          right: 24,
          bottom: 24,
          borderRadius: 999,
          paddingInline: 22,
          height: 36,
          fontWeight: 600,
          backgroundColor: archived ? "#9CA3AF" : "#FB923C",
          borderColor: archived ? "#9CA3AF" : "#FB923C",
          color: "#fff",
        }}
      >
        {archived ? "Unarchive" : "Archive"}
      </Button>
    </Card>
  );
}
