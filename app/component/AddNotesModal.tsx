import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message, Modal } from "antd";
import { addNotes } from "../utils/network_data";
import { AlignLeftOutlined, EditFilled, FileOutlined, PlusOutlined } from "@ant-design/icons";


type AddNotesModalProps = {
  open: boolean,
  onClose: () => void;
};

export default function AddNotesModal({
  open, onClose
}: AddNotesModalProps)
{

  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addNotes,
    onSuccess: (res) => {
      message.success(res.message);
      queryClient.invalidateQueries({queryKey: ["notes"]});
      form.resetFields();
      onClose();
    },
    onError: (err) => {
      message.error(err.message);
    }
  });

   return (
    <Modal
      title={<span className="text-lg font-semibold">Add New Note</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={480}
      className="px-2 sm:px-0"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => mutation.mutate(values)}
        className="space-y-4"
      >
        {/* TITLE */}
        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Title is required" },
            { min: 3, message: "Minimum 3 characters" },
          ]}
        >
          <Input
            prefix={<EditFilled />}
            placeholder="Note title"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        {/* BODY */}
        <Form.Item
          label="Description"
          name="body"
          rules={[
            { required: true, message: "Description is required" },
            { min: 10, message: "Minimum 10 characters" },
          ]}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <FileOutlined style={{ marginTop: 10 }} />
            <Input.TextArea
              placeholder="Tulis catatan di sini..."
              autoSize={{ minRows: 4 }}
            />
          </div>
        </Form.Item>

        {/* ACTION BUTTON */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
            className="w-full sm:w-auto sm:min-w-[120px]"
          >
            Add Note
          </Button>
        </div>
      </Form>
    </Modal>
  );
}