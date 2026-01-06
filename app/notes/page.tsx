"use client";

import { Button, Col, Layout, Row } from "antd";
import AppHeader from "../component/home/AppHeader";
import NoteCard from "../component/home/NoteCard";
import { useQuery } from "@tanstack/react-query";
import { getNotes, getArchivedNotes, Note, getProfile } from "../utils/network_data";
import Loading from "../component/Loading";

const { Content } = Layout;

export default function NotesPage() {
  const {
    data: notes = [],
    isLoading: isNotesLoading,
  } = useQuery<Note[], Error>({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await getNotes();
      if (response.error) throw new Error(response.message || "Failed to fetch notes");
      return response.data ?? [];
    },
  });

  const {
    data: archivedNotes = [],
    isLoading: isArchivedLoading,
  } = useQuery<Note[], Error>({
    queryKey: ["notes", "archived"],
    queryFn: async () => {
      const response = await getArchivedNotes();
      if (response.error) throw new Error(response.message || "Failed to fetch archived notes");
      return response.data ?? [];
    },
  });

  const {data: profile} = useQuery({
    queryKey: ["profile"],
    queryFn: async() => {
      const res = await getProfile();
      if (res.error) throw new Error(res.message || "Failed to fetch profile");
      return res.data;
    },
  })

  const isLoading = isNotesLoading || isArchivedLoading;

  if (isLoading) return <Loading />;


  return (
    <Layout className="min-h-screen">
      <AppHeader user={profile?.name || "Not Found"} />

      <Content className="bg-gray-100 p-6">
        {/* MY NOTES */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">My Notes</h2>
            <Button type="primary">Add Note</Button>
          </div>

         <Row gutter={[16, 16]}>
            {notes.map((note) => (
              <Col key={note.id} xs={24} sm={12} lg={8}>
                <NoteCard title={note.title} content={note.body} archived={note.archived} />
              </Col>
            ))}
          </Row>
        </section>

        {/* ARCHIVED NOTES */}
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">Archived Notes</h2>

          <Row gutter={[16, 16]}>
            {archivedNotes.map((note) => (
              <Col key={note.id} xs={24} sm={12} lg={8}>
                <NoteCard title={note.title} content={note.body} archived={note.archived} />
              </Col>
            ))}
          </Row>
        </section>
      </Content>
    </Layout>
  );
}
