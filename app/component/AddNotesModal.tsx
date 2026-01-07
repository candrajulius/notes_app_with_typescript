import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, message } from "antd";
import { addNotes } from "../utils/network_data";

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

}