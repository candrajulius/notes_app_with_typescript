"use client";

import { Button, Col, Layout, message, Row } from "antd";
import AppHeader from "../component/home/AppHeader";
import NoteCard from "../component/home/NoteCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotes, getArchivedNotes, Note, getProfile, archivedNote, unArchivedNote, getSingleNotes } from "../utils/network_data";
import Loading from "../component/Loading";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import AddNotesModal from "../component/AddNotesModal";
import ShowNoteModal from "../component/ShowNoteModal";

const { Content } = Layout;

export default function NotesPage() {

   const [open, setOpen] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);
   const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

   const queryClient = useQueryClient();

  // Query Single Notes
  const {data: selectedNote, isLoading: isSingleNoteLoading} = useQuery({
    queryKey: ["note", selectedNoteId],
    queryFn: async () => {
      const res = await getSingleNotes(selectedNoteId!);
      if(res.error){ message.error(res.message)};
      return res.data;
    },
    enabled: !!selectedNoteId, // hanya jalan kalau ID ada
  });

  const {
    data: notes = [],
    isLoading: isNotesLoading,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await getNotes();
      if (response.error) throw new Error(response.message || "Failed to fetch notes");
      return response.data ?? [];
    },
  });

  const {
    data: archiveNotes = [],
    isLoading: isArchivedLoading,
  } = useQuery({
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

  const archivedMutation = useMutation({
    mutationFn: archivedNote,
    onSuccess: (res) => {
       message.success(res.message);
       queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (err) => {
      message.error(err.message);
    }
  });

  const unArchivedMutation = useMutation({
    mutationFn: unArchivedNote,
    onSuccess: (res) => {
      message.success(res.message);
      queryClient.invalidateQueries({queryKey: ["notes"]});
    },
    onError: (err) => {
      message.error(err.message);
    }
  });

  const handleToggleArchive = (id: string, archived: boolean) => {
    if(archived){
      unArchivedMutation.mutate(id);
    }else{
      archivedMutation.mutate(id);
    }
  };

  const handleDeleteNote = () => {
     queryClient.invalidateQueries({ queryKey: ["notes"] });
    queryClient.invalidateQueries({ queryKey: ["notes", "archived"] });
  };

  const openModal = (id: string) => {
    setSelectedNoteId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedNoteId(null);
  }

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
            <Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>Add Note</Button>
          </div>

         <Row gutter={[16, 16]}>
            {notes.map((note) => (
              <Col key={note.id} xs={24} sm={12} lg={8}>
                <NoteCard title={note.title} content={note.body} archived={note.archived} onToggleArchive={() => handleToggleArchive(note.id,note.archived)} onClick={() => openModal(note.id)}/>
              </Col>
            ))}
          </Row>
        </section>

        {/* ARCHIVED NOTES */}
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">Archived Notes</h2>
          <Row gutter={[16, 16]}>
            {archiveNotes.map((note) => (
              <Col key={note.id} xs={24} sm={12} lg={8}>
                <NoteCard title={note.title} content={note.body} archived={note.archived} onToggleArchive={() => handleToggleArchive(note.id,note.archived)} onClick={() => openModal(note.id)} />
              </Col>
            ))}
          </Row>
        </section>
      </Content>
      <AddNotesModal open={open} onClose={() => setOpen(false)}/>
      {selectedNote && (
        <ShowNoteModal 
        id={selectedNote.id}
        open={modalOpen} 
        onClose={closeModal} 
        title={selectedNote.title} 
        body={selectedNote.body}
        owner={selectedNote.owner}
        createdAt={selectedNote.createdAt}
        onDelete={handleDeleteNote} />
      )}
    </Layout>
  );
}
