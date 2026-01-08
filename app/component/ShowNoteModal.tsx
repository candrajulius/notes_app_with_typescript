import { Button, Modal, Space, Typography, message} from "antd";
import { DeleteOutlined} from "@ant-design/icons";
import { formatDate } from "../utils/constant";
import { deleteNote } from "../utils/network_data";

const { Text, Title, Paragraph } = Typography;

type ShowNoteModalProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    id: string;
    body: string;
    // archived: boolean;
    createdAt: string;
    owner: string;
    onDelete: () => void;
};

const ShowNoteModal = ({open, onClose, title, body,owner, createdAt, onDelete, id}: ShowNoteModalProps) => {

  const handleDelete = async () => {
    const response = await deleteNote(id);
    if(response.error){
      message.error(response.message);
    }else{
      message.success(response.message);
      onDelete();
      onClose();
    }
  }
  return (
      <Modal
        title={`Detail Note ${id}`}
        open={open}
        onCancel={onClose}
        footer={null}
        className="p-4"
      >
        <Title level={2}>{title}</Title>
        <Paragraph>{body}</Paragraph>
        <div className="flex gap-2">
            <Text type="secondary">Created on: {formatDate(createdAt)}</Text>
            <Text type="secondary">Owner: {owner}</Text>
        </div>
        <div className="mt-4 flex justify-between">
          <Space>
            <Button
              onClick={handleDelete}
              icon={<DeleteOutlined />}
              className="!border-red-500 !text-red-500 hover:!border-red-400 hover:!text-red-400"
            >
              Delete
            </Button>
          </Space>
        </div>
      </Modal>
  );
};

export default ShowNoteModal;
